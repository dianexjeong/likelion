import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  PostSection, 
  PostSubmit, 
  PostSubmitDiv, 
  PostTitle, 
  PostWriteDiv,
  PostTitleDiv } from '../styledComponent';

import InputPost from './InputPost';

const SubmitComponent = React.memo(({onSubmit}) => (
  <PostSubmitDiv>
    <PostSubmit onClick={onSubmit}>작성완료</PostSubmit>
  </PostSubmitDiv>
))

const WriteTitle = React.memo(() => (
  <PostTitleDiv>
    <PostTitle>글쓰기</PostTitle>
  </PostTitleDiv>
))

const WritePost = ({apiUrl}) => {
  const [inputs, setInputs] = useState({
    title: '',
    contents: ''
  });

  const { title, contents } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const navigate = useNavigate();
  const onSubmit = () => {
    axios.post(`${apiUrl}posts/`, {
      title: inputs.title,
      contents: inputs.contents,
      repls: []
    }).then(() => {
      navigate('../');
    })
  }
  return (
    <PostSection>
      <WriteTitle />

      <PostWriteDiv>
        <InputPost onChange={onChange} title={title} contents={contents} />
      </PostWriteDiv>

      <SubmitComponent onSubmit={onSubmit} />
    </PostSection>
  );
};

export default WritePost;