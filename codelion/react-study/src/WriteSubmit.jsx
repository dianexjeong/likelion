import React from 'react';
import { PostSubmit, PostSubmitDiv } from './styledComponent';

const WriteSubmit = ({onSubmit}) => {
  return (
    <PostSubmitDiv>
      <PostSubmit onClick={onSubmit}>작성완료</PostSubmit>
    </PostSubmitDiv>
  );
};

export default React.memo(WriteSubmit);