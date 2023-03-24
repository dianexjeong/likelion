import React, { useState, useRef, useEffect } from 'react';
import { TitleInput, ContentsInput } from './styledComponent';

const InputPost = ({ onChange, title, contents }) => {
  const titleInput = useRef(); // props의 ref 로 연결
  const contentsInput = useRef();

  useEffect(()=>{
    titleInput.current.focus();
  }, []);    // wrtie 페이지 가자마자 title 인풋에 바로 커서가 감

  const onKeyUp = (e)=>{ //title 입력 후 엔터누르면 contents 포커스 
    if(e.key === 'Enter'){
      contentsInput.current.focus();
    }
  }

  return (
    <>
      <TitleInput
          name="title"
          type="text"
          placeholder="제목을 입력해주세요. (15자 이내)"
          value={title}
          onChange={onChange}
          ref={titleInput}
          onKeyUp={onKeyUp}   // Enter 눌렀을 때 
        />
        <ContentsInput
          name="contents"
          value={contents}
          cols="30"
          rows="10"
          onChange={onChange}
          ref={contentsInput}
        ></ContentsInput>
    </>
  );
};

export default InputPost;