package org.dnd3.udongsa.neighborcats.feed.service;

import java.time.LocalDateTime;
import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedTagDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.dnd3.udongsa.neighborcats.imgfile.dto.ImgFileDto;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

public class FeedMapper {

	public static FeedDto map(Feed feed, List<FeedTagDto> feedTags, List<FeedCommentDto> comments, List<ImgFileDto> imgDtos,
			AuthorDto authorDto, Boolean isLike, long numberOfLikes, int numberOfComments, LocalDateTime createdDateTime,
			String timeDesc) {

    FeedDto dto = new FeedDto();
    dto.setId(feed.getId());
    dto.setContent(feed.getContent());
    dto.setFeedTags(feedTags);
    dto.setImages(imgDtos);
    dto.setAuthor(authorDto);
    dto.setComments(comments);
    dto.setIsLike(isLike);
    dto.setNumberOfLikes(numberOfLikes);
    dto.setNumberOfComments(numberOfComments);
    dto.setCreatedDateTime(createdDateTime.toString());
    dto.setTimeDesc(timeDesc);
		return dto;
	}
  
}