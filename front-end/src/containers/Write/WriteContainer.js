import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';

import Write from '../../components/Write/Write';
import useInput from '../../hooks/useInput';
import { NEXT_WRITE_PAGE, GO_BACK_FEED_PAGE } from '../../modules/write';

const WriteContainer = () => {
  const [focus, setFocus] = useState(false);

  const dispatch = useDispatch();
  const { feedTags } = useSelector((state) => state.feed);
  const { imgFiles, path, tagId, content, prevClick, prevId } = useSelector((state) => state.write);

  const [click, setClick] = useState(prevClick || false);
  const [checkId, setCheckId] = useState(tagId || 1);
  const [text, onChangeText] = useInput(content || '');

  const [files, setFiles] = useState({
    file: imgFiles || [],
    previewPath: path || [],
  });

  const { file, previewPath } = files;

  const imageInputRef = useRef();
  // const videoInputRef = useRef();
  const nextId = useRef(prevId || 0);

  useEffect(() => {
    if (!feedTags) {
      dispatch({
        type: GO_BACK_FEED_PAGE,
      });
    }
  }, [dispatch, feedTags]);

  const onClickImage = useCallback(() => {
    imageInputRef.current.click();
    setClick(true);
  }, []);

  // const onClickVideo = useCallback(() => {
  //   console.log('비디오');
  //   videoInputRef.current.click();
  // }, []);

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

  // const onChangeVideo = useCallback(() => {}, []);

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

  /* 피드 태그 선택 */
  const onClickWriteTag = useCallback(
    (index) => () => {
      setCheckId(index);
    },
    [],
  );

  const onFocusText = useCallback(() => {
    setFocus((prev) => !prev);
  }, []);

  const onFinishNextPage = useCallback(() => {
    dispatch({
      type: NEXT_WRITE_PAGE,
      data: {
        imgFiles: file,
        path: previewPath,
        tagId: checkId,
        content: text,
        prevClick: click,
        prevId: nextId,
      },
    });
  }, [checkId, click, dispatch, file, previewPath, text]);

  if (!feedTags) {
    return null;
  }

  return (
    <Write
      feedTags={feedTags}
      onFinishNextPage={onFinishNextPage}
      imageInputRef={imageInputRef}
      // videoInputRef={videoInputRef}
      onChangeImage={onChangeImage}
      // onChangeVideo={onChangeVideo}
      onClickImage={onClickImage}
      // onClickVideo={onClickVideo}
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
