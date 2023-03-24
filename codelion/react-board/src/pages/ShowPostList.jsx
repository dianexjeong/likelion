import {
  faArrowsRotate,
  faPenToSquare,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import loadingIcon from '../loading.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CursorDiv,
LoadingDiv,
LoadingImg,
PagenumberDiv,
PagingSection,
PostListDiv,
PostSection,
PostTitle,
PostTitleDiv,
PageEmptyDiv
} from '../styledComponent';

import axios from 'axios';
import EachPost from './EachPost';

const ShowPostList = ({apiUrl}) => {
  // 로딩 이미지
  const [loading, setLoading] = useState(true);
  // 포스트 정보
  const [postList, setPostList] = useState([]);
  // 현재 페이지 번호
  const [page, setPage] = useState(1);
  // 전체 페이지 번호들
  const [pages, setPages] = useState([]);



  // 리렌더링 될 때마다, 함수 재사용
  const getPostList = useCallback(()=>{
    setLoading(true);
    // page 수의 페이지에 있는 데이터 요청 & 응답
    const url = `${apiUrl}list/?page=${page}$page_size=10`;
    axios.get(url)
      .then((response) => {
        // 마지막 페이지
        // 한 페이지 당 10개씩
        // 전체 포스트 글 수 / 10 올림
        const lastPage = Math.ceil(response.data.count / 10);

        // 첫 번째 페이지 ~ 마지막 페이지 번호 
        const tempPages = [];
        for(let i = 1; i <= lastPage; i++){
          tempPages.push(i);
        }
        setPages(tempPages);

        setPostList(response.data.results);
        setLoading(false);
      })
  });

  // page가 변할 때마다 getPostList 실행
  useEffect(getPostList, [page]);

  const navigate = useNavigate();
  const goWrite = () => {
    navigate('/write');
  }


  return (
    <>
    {/* 포스트들의 목록들 제목으로 보여주기 */}
    <PostSection>
      <PostTitleDiv>
        <FontAwesomeIcon onClick={getPostList} icon={faArrowsRotate} />
        <PostTitle>익명게시판</PostTitle>
        <CursorDiv>
          <FontAwesomeIcon onClick={goWrite} icon={faPenToSquare} />
        </CursorDiv>
      </PostTitleDiv>

      <PostListDiv>
        {/* 로딩 중일 땐 로딩 아이콘 보여주기 */}
        {loading ? (
          <LoadingDiv>
            <LoadingImg src={loadingIcon} />
          </LoadingDiv>
        ) : (
          <ul>
            {postList.map((post) => (
              // EachPost
              <EachPost key={post.id} title={post.title} postID={post.id} />
            ))}
          </ul>
        )}
      </PostListDiv>
    </PostSection>


    {/* 페이지 버튼 */}
    <PagingSection>
      {/* 왼쪽 이동 아이콘 */}
      {page > 1 ? (
        <PagenumberDiv onClick={() => {
          if(page > 1){
            setPage(page - 1)
          }
        }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PagenumberDiv>
      ) : (
        <PageEmptyDiv></PageEmptyDiv>
      )}

      {pages.map((pageNum) => (
        <PagenumberDiv key={pageNum}>{pageNum}</PagenumberDiv>
      ))}

      {/* 오른쪽 이동 아이콘 */}
      {page < pages.length ? (
        <PagenumberDiv onClick={() => {
          if(page < pages.length){
            setPage(page + 1)
          }
        }}>
          <FontAwesomeIcon icon={faArrowRight} />
        </PagenumberDiv>
      ) : (
        <PageEmptyDiv></PageEmptyDiv>
      )}
    </PagingSection>
    

    </>
  );
};

export default ShowPostList;