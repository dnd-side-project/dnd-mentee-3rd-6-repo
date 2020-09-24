package org.dnd3.udongsa.neighborcats.feed.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import java.util.List;

import org.dnd3.udongsa.neighborcats.exception.CustomException;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSearchDto;
import org.dnd3.udongsa.neighborcats.feed.dto.PagingDto;
import org.dnd3.udongsa.neighborcats.feed.entity.EFilterType;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedTestBuilder;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedRepository;
import org.dnd3.udongsa.neighborcats.keep.KeepService;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantTestUtils;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.dnd3.udongsa.neighborcats.tag.Tag;
import org.dnd3.udongsa.neighborcats.tag.TagTestBuilder;
import org.dnd3.udongsa.neighborcats.util.TimeDescService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class FeedServiceTest {

  private FeedService feedService;
  @InjectMocks private FeedServiceImpl feedServiceImpl;
  @Mock private FeedRepository feedRepo;
  @Mock private FeedTagService feedTagService;
  @Mock private SecurityContextService securityService;
  @Mock private FeedMapperService feedMapperService;
//  @Mock private ServantService servantService;
//  @Mock private FeedCommentService feedCommentService;
//  @Mock private FeedImgService feedImgService;
//  @Mock private FeedLikeService feedLikeService;
//  @Mock private TimeDescService timeDescService;
//  @Mock private FeedCatService feedCatService;
//  @Mock private KeepService keepService;

  @BeforeEach
  public void setup(){
    this.feedService = this.feedServiceImpl;
  }

  @Test
  @DisplayName("Hometown과 태그ID로 조회 테스트")
  public void Given_Filter_Hometown_TagId_When_FindAll_When_Ok(){

    // Given
    FeedSearchDto search = new FeedSearchDto();
    search.setFilterType(EFilterType.HOMETOWN);
    search.setTagId(1L);
    search.setPageNumber(0);
    search.setPageSize(10);

    Servant loggedUser = ServantTestUtils.generateDefault();
    given(securityService.getLoggedUser()).willReturn(loggedUser);

    Tag tag = TagTestBuilder.build("일상");
    given(feedTagService.findTagByTagId(search.getTagId())).willReturn(tag);

    List<Feed> feeds = FeedTestBuilder.buildFeeds("Content");
    Pageable pageable = PageRequest.of(search.getPageNumber(), search.getPageSize(), Sort.Direction.DESC, "createdAt");
    Page<Feed> pageFeeds = new PageImpl<>(feeds, pageable, 100);
    given(feedRepo.findAllByTagAndAddress(tag, loggedUser.getAddress(), pageable)).willReturn(pageFeeds);

    List<FeedDto> feedDtoList = FeedTestBuilder.buildFeedDtoList("content");
    given(feedMapperService.toDto(feeds, false)).willReturn(feedDtoList);

    // When
    PagingDto<FeedDto> feedPageDtoList = feedService.findAll(search);

    // Then
    assertThat(feedPageDtoList.getContents().size()).isLessThanOrEqualTo(search.getPageSize());
    assertThat(search.getPageSize()).isEqualTo(feedPageDtoList.getPageSize());
    assertThat(search.getPageNumber()).isEqualTo(feedPageDtoList.getPageNumber());

  }
  
  @Test
  @DisplayName("페이지네이션 정보 없을 시, BadRequest 예외 발생")
  public void Given_None_Pageable_When_FindAll_Then_Throws_BadRequestEx(){
    // Given
    FeedSearchDto searchDto = new FeedSearchDto();
    searchDto.setPageSize(null);
    searchDto.setPageNumber(null);

    // When
    Throwable thrown = catchThrowable(() -> {
      this.feedService.findAll(searchDto);
    });

    // Then
    assertThat(thrown).isInstanceOf(CustomException.class)
                      .hasMessage("pageSize 또는 PageNumber Null입니다.");
  }

  @Test
  @DisplayName("Page Size가 0이면, BadReqest 예외 발생")
  public void Given_PageSize_is_0_When_FindAll_Then_Throws_BadRequestEx(){
    // Given
    FeedSearchDto searchDto = new FeedSearchDto();
    searchDto.setPageSize(0);
    searchDto.setPageNumber(1);

    // When
    Throwable thrown = catchThrowable(()->this.feedService.findAll(searchDto));

    // Then
    assertThat(thrown).isInstanceOf(CustomException.class)
                      .hasMessage("PageSize는 1 이상이어야 합니다.");
  }


  @DisplayName("Hometown으로 조회 시, 우리동네에 해당하는 피디들 반환")
  public void Given_Filter_Hometown_When_FindAll_When_Ok(){

  }

  @DisplayName("태그로만 조회 시, 에러발생")
  public void Given_TagId_When_FindAll_When_Ok(){

  }

  // @Test
  @DisplayName("친구로 조회 시, 친구가 작성한 피디들 조회")
  public void Given_Filter_Friend_When_FindAll_When_Ok(){

  }

  // @Test
  @DisplayName("전체와 인기순으로 조회 시, 인기순 정렬되어 피드들 조회")
  public void Given_Filter_All_Sort_Popular_When_FindAll_When_Ok(){

  }

  // @Test
  @DisplayName("전체와 최신순으로 조회 시, 최신순 정렬되어 피드들 조회")
  public void Given_FilterType_All_Sort_Latest_When_findAll_When_Ok(){

  }

  // @Test
  @DisplayName("고양이 식별자로 조회 시, 고양이 태그된 피드들만 조회")
  public void Given_CatId_When_findAll_When_Ok(){

  }
}
