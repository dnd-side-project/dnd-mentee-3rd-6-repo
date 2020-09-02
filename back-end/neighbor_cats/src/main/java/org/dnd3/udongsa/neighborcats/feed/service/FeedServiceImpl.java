package org.dnd3.udongsa.neighborcats.feed.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.cat.service.CatService;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSearchDto;
import org.dnd3.udongsa.neighborcats.feed.dto.PagingDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedMapper;
import org.dnd3.udongsa.neighborcats.feed.repository.FeedRepository;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.servant.service.ServantService;
import org.dnd3.udongsa.neighborcats.tag.TagDto;
import org.dnd3.udongsa.neighborcats.util.TimeDescService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {

  private final FeedRepository repo;
  private final FeedCommentService commentService;
  private final FeedTagService feedTagService;
  private final FeedImgService feedImgService;
  private final SecurityContextService securityService;
  private final FeedLikeService feedLikeService;
  private final TimeDescService timeDescService;
  private final ServantService servantService;
  private final CatService catService;

  @Override
  public PagingDto<FeedDto> findAll(FeedSearchDto searchDto) {
    Pageable pageable = PageRequest.of(searchDto.getPageNumber(), searchDto.getPageSize());
    Page<Feed> pageFeeds = repo.findAll(pageable);
    List<FeedDto> feedDtos = new ArrayList<>();
    for(Feed feed : pageFeeds.getContent()){
      List<TagDto> feedTags = feedTagService.getAllByFeed(feed);
      List<FeedCommentDto> comments = commentService.getAllByFeed(feed);
      List<ImgFileDto> imgDtos = feedImgService.getAllByFeed(feed);
      AuthorDto authorDto = ServantMapper.map(feed.getAuthor());
      Boolean isLike = feedLikeService.isLikeByServant(securityService.getLoggedUserEmail(), feed);
      long numberOfLikes = feedLikeService.getNumberOfLikes(feed);
      int numberOfComments = comments.size();
      LocalDateTime createdDateTime = feed.getCreatedAt();
      String timeDesc = timeDescService.generate(createdDateTime);
      FeedDto feedDto = FeedMapper.map(feed, feedTags, comments, imgDtos, authorDto, isLike, numberOfLikes, numberOfComments, createdDateTime, timeDesc);
      feedDtos.add(feedDto);
    } 
    PagingDto<FeedDto> pagingDto = PagingMapper.map(pageFeeds, feedDtos);
    return pagingDto;
  }

  @Override
  public FeedDto save(FeedSaveDto saveDto) {
    Servant author = servantService.findServantByEmail(securityService.getLoggedUserEmail());
    Cat cat = catService.findCatById(saveDto.getCatId());
    Feed feed = FeedMapper.map(saveDto, author, cat);
    repo.save(feed);
    List<ImgFileDto> imgFiles = feedImgService.save(saveDto.getImgFiles(), feed);
    List<TagDto> tags = feedTagService.save(saveDto.getTagIds(), feed);
    String timeDesc = timeDescService.generate(feed.getCreatedAt());
    return FeedMapper.map(feed, tags, null, imgFiles, ServantMapper.map(author), false, 0L, 0, feed.getCreatedAt(), timeDesc);
  }

  @Override
  public FeedDto findById(Long id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public FeedDto delete(Long id) {
    Feed feed = repo.findById(id).orElseThrow();
    feedTagService.deleteByFeed(feed);
    commentService.deleteByFeed(feed);
    feedImgService.deleteByFeed(feed);
    feedLikeService.deleteByFeed(feed);
    FeedDto feedDto = new FeedDto();
    feedDto.setId(feed.getId());
    repo.delete(feed);
    return feedDto;
  }

  @Override
  public FeedDto modify(FeedModifyDto modifyDto) {
    // TODO Auto-generated method stub
    return null;
  }


}