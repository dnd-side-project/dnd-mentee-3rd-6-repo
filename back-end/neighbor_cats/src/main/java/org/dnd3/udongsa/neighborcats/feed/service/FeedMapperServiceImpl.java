package org.dnd3.udongsa.neighborcats.feed.service;

import lombok.RequiredArgsConstructor;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.security.service.SecurityContextService;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.ServantMapper;
import org.dnd3.udongsa.neighborcats.util.TimeDescService;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class FeedMapperServiceImpl implements FeedMapperService {

  private final FeedImgService feedImgService;
  private final FeedLikeService feedLikeService;
  private final SecurityContextService securityService;
  private final TimeDescService timeDescService;
  private final FeedCommentService commentService;

  @Override
  public FeedDto toDto(Feed feed, boolean withComments) {
    List<ImgFileDto> imgDtos = feedImgService.getAllByFeed(feed);
    AuthorDto authorDto = ServantMapper.map(feed.getAuthor());
    Boolean isLike = feedLikeService.isLikeByServant(securityService.getLoggedUser(), feed);
    long numberOfLikes = feed.getLikes().size();
    int numberOfComments = feed.getComments().size();
    LocalDateTime createdDateTime = feed.getCreatedAt();
    String timeDesc = timeDescService.generate(createdDateTime);
    List<FeedCommentDto> comments = new ArrayList<>();
    if (withComments) {
      comments = commentService.getAllByFeed(feed);
    }
    FeedDto feedDto = buildDto( feed,
                                imgDtos,
                                authorDto,
                                isLike,
                                numberOfLikes,
                                numberOfComments,
                                createdDateTime,
                                timeDesc,
                                comments);
    return feedDto;
  }

  @Override
  public List<FeedDto> toDto(List<Feed> feeds, boolean withComments) {
    return feeds.stream().map(feed->toDto(feed, withComments)).collect(Collectors.toList());
  }

  private FeedDto buildDto(Feed feed,
                           List<ImgFileDto> imgDtos,
                           AuthorDto authorDto,
                           Boolean isLike,
                           long numberOfLikes,
                           int numberOfComments,
                           LocalDateTime createdDateTime,
                           String timeDesc,
                           List<FeedCommentDto> commentDtos) {

    FeedDto dto = new FeedDto();
    dto.setId(feed.getId());
    dto.setContent(feed.getContent());
    if (Objects.nonNull(imgDtos))
      dto.setImages(imgDtos);
    dto.setAuthor(authorDto);
    dto.setIsLike(isLike);
    dto.setNumberOfLikes(numberOfLikes);
    dto.setNumberOfComments(numberOfComments);
    if (Objects.nonNull(createdDateTime)) {
      dto.setCreatedDateTime(createdDateTime.toString());
    }
    dto.setTimeDesc(timeDesc);
    if (Objects.nonNull(commentDtos)) {
      dto.setComments(commentDtos);
    }
    return dto;
  }
}
