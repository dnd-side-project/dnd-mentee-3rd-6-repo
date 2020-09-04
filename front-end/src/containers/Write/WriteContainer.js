import React, { useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';

import Write from '../../components/Write/Write';
import useInput from '../../hooks/useInput';
import { NEXT_WRITE_PAGE } from '../../modules/write';

const WriteContainer = () => {
  const [files, setFiles] = useState({
    file: [],
    previewPath: [],
  });
  const [checkId, setCheckId] = useState(1);
  const [text, onChangeText] = useInput('');
  const [focus, setFocus] = useState(false);
  const [click, setClick] = useState(false);

  const { file, previewPath } = files;

  const dispatch = useDispatch();
  const { feedTags } = useSelector((state) => state.feed.feedAllTags);

  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const nextId = useRef(0);

  const onClickImage = useCallback(() => {
    console.log('이미지');
    imageInputRef.current.click();
    setClick(true);
  }, []);

  const onClickVideo = useCallback(() => {
    console.log('비디오');
    videoInputRef.current.click();
  }, []);

  const onChangeImage = useCallback((e) => {
    [].forEach.call(e.target.files, (f) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFiles(
          produce((draft) => {
            draft.file.unshift({ id: nextId.current, f });
            draft.previewPath.unshift({ id: nextId.current, url: reader.result });
          }),
        );
      };

      reader.onloadend = () => {
        nextId.current += 1;
      };

      reader.readAsDataURL(f);
    });
  }, []);

  const onChangeVideo = useCallback(() => {}, []);

  const onClickClose = useCallback(
    (index) => () => {
      setFiles({
        ...files,
        file: file.filter((v) => v.id !== index),
        previewPath: previewPath.filter((v) => v.id !== index),
      });
    },
    [file, files, previewPath],
  );

  /* 피드 태그 호출 */
  const onClickWriteTag = useCallback(
    (index) => () => {
      setCheckId(index);
    },
    [],
  );

  const onFocusText = useCallback(() => {
    setFocus((prev) => !prev);
  }, []);

  const onFinishFeed = useCallback(() => {
    dispatch({
      type: NEXT_WRITE_PAGE,
    });
    setClick(false);
  }, [dispatch]);

  return (
    <Write
      feedTags={feedTags}
      onFinishFeed={onFinishFeed}
      imageInputRef={imageInputRef}
      videoInputRef={videoInputRef}
      onChangeImage={onChangeImage}
      onChangeVideo={onChangeVideo}
      onClickImage={onClickImage}
      onClickVideo={onClickVideo}
      previewPath={previewPath}
      onClickClose={onClickClose}
      checkId={checkId}
      onClickWriteTag={onClickWriteTag}
      text={text}
      onChangeText={onChangeText}
      focus={focus}
      onFocusText={onFocusText}
      click={click}
    />
  );
};

export default WriteContainer;
