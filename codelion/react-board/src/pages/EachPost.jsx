import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  EachPostLi,
  PostLink,
  PostRepl,
} from '../styledComponent'

const EachPost = ({title, postID}) => {
  const navigate = useNavigate();

  const goPost = () => {
    // domain/post/1 로 이동
    navigate(`${'/post/' + postID}`)
  }
  return (
    // 각 포스트의 제목을 누르면 디테일 페이지로 이동 
    <EachPostLi onClick={goPost}>
      <div>
        <FontAwesomeIcon icon={faLocationPin} />
        <PostLink>{title}</PostLink>
      </div>
    </EachPostLi>
  );
};

export default EachPost;