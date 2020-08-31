import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import produce from 'immer';

import Write from '../../components/Write/Write';

const WriteContainer = () => {
  const [files, setFiles] = useState({
    file: [],
    previewPath: [],
  });

  const { file, previewPath } = files;

  const { feedTags } = useSelector((state) => state.feed.feedAllTags);

  const imageInputRef = useRef();
  const videoInputRef = useRef();
  const nextId = useRef(0);

  const onFinishFeed = useCallback(() => {
    console.log('피드 작성');
  }, []);

  const onClickImage = useCallback(() => {
    console.log('이미지');
    imageInputRef.current.click();
  }, []);

  const onClickVideo = useCallback(() => {
    console.log('비디오');
    videoInputRef.current.click();
  }, []);

  const onChangeImage = useCallback((e) => {
    [].forEach.call(e.target.files, (f) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFiles(
          produce((draft) => {
            draft.file.push(f);
            draft.previewPath.push({ id: nextId.current, url: reader.result });
          }),
        );
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
        previewPath: previewPath.filter((v) => v.id !== index),
      });
    },
    [files, previewPath],
  );

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
    />
  );
};

export default WriteContainer;
