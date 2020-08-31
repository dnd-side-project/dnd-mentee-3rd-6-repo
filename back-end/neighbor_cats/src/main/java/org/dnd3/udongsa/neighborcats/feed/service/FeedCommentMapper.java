package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedCommentDto;
import org.dnd3.udongsa.neighborcats.feed.dto.ReplyDto;
import org.dnd3.udongsa.neighborcats.feed.entity.FeedComment;
import org.dnd3.udongsa.neighborcats.servant.dto.AuthorDto;

public class FeedCommentMapper {

	public static FeedCommentDto map(FeedComment comment, long numberOfLikes, List<ReplyDto> replies,
			int numberOfReplies, boolean isLike, String createdDateTime, String timeDesc, AuthorDto authorDto) {

    FeedCommentDto dto = new FeedCommentDto();
    dto.setId(comment.getId());
    dto.setContent(comment.getContent());
    dto.setNumberOfLikes(numberOfLikes);
    dto.setReplies(replies);
    dto.setNumberOfReplies(numberOfReplies);
    dto.setIsLike(isLike);
    dto.setCreatedDateTime(createdDateTime);
    dto.setTimeDesc(timeDesc);
    dto.setAuthor(authorDto);
		return dto;
	}

}
