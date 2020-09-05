package org.dnd3.udongsa.neighborcats.feed.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveDto;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;
import org.dnd3.udongsa.neighborcats.servant.entity.Servant;

public class FeedMapper {

	public static FeedDto map(Feed feed, List<ImgFileDto> imgDtos,
			AuthorDto authorDto, Boolean isLike, long numberOfLikes, int numberOfComments, LocalDateTime createdDateTime,
			String timeDesc) {

    FeedDto dto = new FeedDto();
    dto.setId(feed.getId());
    dto.setContent(feed.getContent());
    if(Objects.nonNull(imgDtos))
      dto.setImages(imgDtos);
    dto.setAuthor(authorDto);
    dto.setIsLike(isLike);
    dto.setNumberOfLikes(numberOfLikes);
    dto.setNumberOfComments(numberOfComments);
    if(Objects.nonNull(createdDateTime))
      dto.setCreatedDateTime(createdDateTime.toString());
    dto.setTimeDesc(timeDesc);
		return dto;
	}

	public static Feed map(FeedSaveDto saveDto, Servant author) {
    return Feed.of(saveDto.getContent(), author);
  }
  
}