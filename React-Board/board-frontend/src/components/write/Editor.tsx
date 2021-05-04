// quill 패키지 사용한 에디터
import React, { useRef, useEffect, useCallback } from 'react';
import Quill from 'quill';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Responsive from '../common/Responsive';
import 'quill/dist/quill.bubble.css';
import { ChangeFieldPayload } from '../../modules/write';

const EditorBlock = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`;
type EditorProps = {
  onChangeField: (payload: ChangeFieldPayload) => void;
  onUploadImage: (payload: FormData) => void;
  title: string;
  body: string;
  imageSrc: string;
};

function Editor({
  onChangeField,
  onUploadImage,
  title,
  body,
  imageSrc,
}: EditorProps) {
  const quillElement = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<any>(null);
  const imageRef = useRef<any>(null);

  // 이미지 업로드가 끝났다면, 서버로부터 받은 이미지의 경로로 img 태그를 연다.
  useEffect(() => {
    if (imageSrc !== '') {
      // 개발 모드 수정해야함.
      // quillInstance.current.root.innerHTML =
      //   quillInstance.current.root.innerHTML +
      //   `<img src="http://localhost:3003/${imageSrc}" crossorigin="anonymous" width="644px"/>`;
      // 배포 모드
      quillInstance.current.root.innerHTML =
        quillInstance.current.root.innerHTML +
        `<img src="http://121.168.76.254:3003/${imageSrc}" crossorigin="anonymous" width="644px"/>`;
      onChangeField({ key: 'imageSrc', value: '' });
    }
  }, [imageSrc, onChangeField]);

  // toolbar clicked handler
  const onClickImageBtn = useCallback(() => {
    if (imageRef && imageRef.current) imageRef.current.click();
  }, [imageRef]);

  // upload Image
  const onChangeImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFormData = new FormData();

    if (e.target && e.target.files) {
      Array.from(e.target.files).forEach(function (file) {
        imageFormData.append('image', file);
        // imageFormData.push(file);
      });
    }
    onUploadImage(imageFormData);
  };

  useEffect(() => {
    if (!quillElement.current) return;
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요.',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    const quill = quillInstance.current;

    // 이미지 처리를 위한 툴바 분리, 이미지에 대한 콜백함수 등록
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', onClickImageBtn);

    // 텍스트 입력 시 redux에 담는다.
    quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
      if (source === 'user')
        onChangeField({ key: 'body', value: quill.root.innerHTML });
    });
  }, [onChangeField, onClickImageBtn]);

  const mounted = useRef<boolean>(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = body;
  }, [body]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <input
          hidden
          type="file"
          onChange={onChangeImageInput}
          ref={imageRef}
        />
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
}

export default Editor;
