import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  LoadingDiv,
  LoadingImg,
  PostReadDiv,
  PostReplDiv,
  PostSection,
  PostTitle,
  PostTitleDiv,
  Repl,
  ReplInput,
  ReplSubmitDiv,
  ReplTitleDiv,
  Replwriter,
  WritereplDiv,
} from '../styledComponent';
import loadingIcon from '../loading.svg';
import axios from 'axios';

// 댓글 개수 계산
const countRepls = (repls) => {
  console.log('댓글 개수를 세는 중...')
  return repls.length;
}

// 포스트와 댓글 보여주는 컴포넌트 
const PostAndRepl = React.memo(({ post, postLoading, replLoading, repls, replCount }) => {
  return (
    <>
      <PostTitleDiv>
        <PostTitle>
          {post && post.title}
        </PostTitle>
      </PostTitleDiv>

      {postLoading ? (
        <LoadingDiv>
          <LoadingImg src={loadingIcon} />
        </LoadingDiv>
      ) : (
        <PostReadDiv>{post && post.contents}</PostReadDiv>
      )}

      <ReplTitleDiv>뎃글 {replCount}</ReplTitleDiv>
      {replLoading ? (
        <LoadingDiv>
          <LoadingImg src={loadingIcon} />
        </LoadingDiv>
      ) : (
        repls &&
        repls.map((element) => (
          <PostReplDiv key={element}>
            <Replwriter>익명</Replwriter>
            <Repl>{element}</Repl>
          </PostReplDiv>
        ))
      )}
      
    </>
  )
})

const ShowPost = ({apiUrl}) => {
  const Params = useParams();
  const [post, setPost] = useState(null);
  const [repls, setRepls] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [replLoading, setReplLoading] = useState(true);

  const replInput = useRef();

  useEffect(() => {
    axios.get(`${apiUrl}posts/${Params.postID}`)
      .then((response) => {
        setPost(response.data);
        setPostLoading(false);
        setRepls(response.data.repls);
        setReplLoading(false);
        replInput.current.focus();
      })
  }, []);

  const [repl, setRepl] = useState('');

  const onChange = (e) => {
    setRepl(e.target.value);
  }

  const replCount = useMemo(() => countRepls(repls), [repls]);

  const onSubmitRepl = () => {
    axios.post(`${apiUrl}repl/`, {
      contents: repl,
      post: Params.postID,
    }).then(() => {
      window.location.reload();
    })
  }

  if(!Params.postID) {
    return <PostSection>잘못된 접근입니다.</PostSection>
  }
  return (
    <>
      <PostSection>
        <PostAndRepl 
          post={post}
          postLoading={postLoading}
          replCount={replCount}
          replLoading={replLoading}
          repls={repls} />

        <WritereplDiv>
          <ReplInput onChange={onChange} value={repl} ref={replInput} />
          <ReplSubmitDiv onClick={onSubmitRepl}>
            <span>입력</span>
          </ReplSubmitDiv>
        </WritereplDiv>
      </PostSection>
    </>
  );
};

export default ShowPost;