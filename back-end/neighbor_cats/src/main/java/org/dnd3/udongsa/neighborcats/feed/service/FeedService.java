package org.dnd3.udongsa.neighborcats.feed.service;

import org.dnd3.udongsa.neighborcats.feed.dto.FeedDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedModifyDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSaveDto;
import org.dnd3.udongsa.neighborcats.feed.dto.FeedSearchDto;
import org.dnd3.udongsa.neighborcats.feed.dto.PagingDto;

public interface FeedService {

	PagingDto<FeedDto> findAll(FeedSearchDto serachDto);

	FeedDto save(FeedSaveDto saveDto);

	FeedDto findById(Long id);

	FeedDto delete(Long id);

	FeedDto modify(FeedModifyDto modifyDto);
  
}