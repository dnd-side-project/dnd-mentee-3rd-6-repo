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

  const resizeImage = (image, fileType) => {
    const canvas = document.createElement('canvas');
    const maxSize = 400;
    let { width } = image;
    let { height } = image;

    if (width > height) {
      // 가로가 긴 경우
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else {
      // 세로가 길 경우
      // eslint-disable-next-line no-lonely-if
      if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(image, 0, 0, width, height);

    return canvas.toDataURL(fileType.type);
  };

  const dataURLToBlob = (dataURL) => {
    const BASE64_MARKER = ';base64,';

    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',');
      const contentType = parts[0].split(':')[1];
      const raw = parts[1];

      return new Blob([raw], {
        type: contentType,
      });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    let i = 0;
    while (i < rawLength) {
      uInt8Array[i] = raw.charCodeAt(i);
      i++;
    }

    return new Blob([uInt8Array], {
      type: contentType,
    });
  };

  const onChangeImage = useCallback((e) => {
    [].forEach.call(e.target.files, (f) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();

        image.src = event.target.result;

        image.onload = async () => {
          const prevImgResult = await resizeImage(image, f);
          const fileResult = await dataURLToBlob(prevImgResult);

          await setFiles(
            produce((draft) => {
              draft.file.unshift({ id: nextId.current, f: fileResult });
              draft.previewPath.unshift({ id: nextId.current, url: prevImgResult });
            }),
          );

          nextId.current += 1;
        };
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
