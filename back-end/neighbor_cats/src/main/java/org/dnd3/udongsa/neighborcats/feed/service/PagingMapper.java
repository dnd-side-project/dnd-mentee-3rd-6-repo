package org.dnd3.udongsa.neighborcats.feed.service;

import java.util.List;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.PagingDto;
import org.dnd3.udongsa.neighborcats.feed.entity.Feed;
import org.springframework.data.domain.Page;

public class PagingMapper {

	public static PagingDto<FeedDto> map(Page<Feed> pageFeeds, List<FeedDto> feedDtos) {
    PagingDto<FeedDto> dto = new PagingDto<>();
    dto.setPageNumber(pageFeeds.getNumber());
    dto.setPageSize(pageFeeds.getSize());
    dto.setTotalPages(pageFeeds.getTotalPages());
    dto.setLast(pageFeeds.isLast());
    dto.setFirst(pageFeeds.isFirst());
    dto.setContents(feedDtos);
		return dto;
	}

}
