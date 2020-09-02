package org.dnd3.udongsa.neighborcats.feed.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.dnd3.udongsa.neighborcats.cat.entity.Cat;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveDto;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;
import org.dnd3.udongsa.neighborcats.tag.TagDto;

public class FeedMapper {

	public static FeedDto map(Feed feed, List<TagDto> tagDtos, List<FeedCommentDto> comments, List<ImgFileDto> imgDtos,
			AuthorDto authorDto, Boolean isLike, long numberOfLikes, int numberOfComments, LocalDateTime createdDateTime,
			String timeDesc) {

    FeedDto dto = new FeedDto();
    dto.setId(feed.getId());
    dto.setContent(feed.getContent());
    if(Objects.nonNull(tagDtos))
      dto.setFeedTags(tagDtos);
    if(Objects.nonNull(imgDtos))
      dto.setImages(imgDtos);
    dto.setAuthor(authorDto);
    if(Objects.nonNull(comments))
      dto.setComments(comments);
    dto.setIsLike(isLike);
    dto.setNumberOfLikes(numberOfLikes);
    dto.setNumberOfComments(numberOfComments);
    if(Objects.nonNull(createdDateTime))
      dto.setCreatedDateTime(createdDateTime.toString());
    dto.setTimeDesc(timeDesc);
		return dto;
	}

	public static Feed map(FeedSaveDto saveDto, Servant author, Cat cat) {
    return Feed.of(saveDto.getContent(), author, cat);
	}
  
}