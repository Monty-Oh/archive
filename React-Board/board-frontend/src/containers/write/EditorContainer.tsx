import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Editor from '../../components/write/Editor';
import { changeField, initialize, uploadImages } from '../../modules/write';
import { RootState } from '../../modules';

function EditorContainer() {
  const dispatch = useDispatch();
  const { title, body, imageSrc } = useSelector(({ write }: RootState) => ({
    title: write.title,
    body: write.body,
    imageSrc: write.imageSrc,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onUploadImage = useCallback(
    (payload) => {
      dispatch(uploadImages(payload));
    },
    [dispatch],
  );

  // 언마운트 될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Editor
      onChangeField={onChangeField}
      title={title}
      body={body}
      onUploadImage={onUploadImage}
      imageSrc={imageSrc}
    />
  );
}

export default EditorContainer;
