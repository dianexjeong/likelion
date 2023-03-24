import React, { useState, useEffect, useCallback } from "react";

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
} from './styledComponent';

// yarn add @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons
import {
  faArrowsRotate,
  faPenToSquare,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import EachPost from './EachPost';
import loadingIcon from './loading.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import EachPost from './EachPost'
import { useNavigate } from "react-router-dom";

// const initialPostList = [
//     { id: 1, title: ', 시사N 대학기자상 취재'},
//     { id: 2, title: '학보, 시사N 대학기자상 취재'},
//     { id: 3, title: '학보, 시사N 대학기자상 취재'},
// ]

function ShowPostList({apiUrl}){
    const [loading, setLoading] = useState(true);
    const [isPost, setIsPost] = useState(false);
    const [postList, setPostList] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([]);

    // const addPost = () => {
    //     setPostList((postList) => [
    //         ...postList, {id: 4, title: '학보, 시사N 대학기자상 취재', replCount: 21},
    //     ])
    // };

    // useCallback으로 addPost() memorize!
    // const addPost = useCallback(() => {
    //     setPostList((postList) => [
    //         ...postList, 
    //         {id: 4, title: '학보, 시사N 대학기자상 취재', replCount: 21},
    //     ])
    // }, [postList]);  // postList가 바뀌면 연산해주세요~ -> dependency 주기

    const navigate = useNavigate();
    const goWrite = () => {
        navigate('/write');
    };

    // axios
    // useEffect(() => {
    //     // 백엔드 api
    //     const url = `${apiUrl}list/?page=1&page_size=10`;
    //     axios.get(url).then((response) => {
    //         console.log(response.data)
    //     })
    // }, []);

    useEffect(() => {
        // setTimeout(() => {
        //     setPostList(initialPostList);
        //     setLoading(false);
        // }, 500)
        const url = `${apiUrl}list/?page=${page}&page_size=10`;
        axios.get(url).then((response) => {
            const lastPage = Math.ceil(response.data.count / 10);
            const tempPages = [];

            for(let i = 1; i <= lastPage; i++){
                tempPages.push(i);
            }
            setPages(tempPages);

            setPostList(response.data.results);
            setLoading(false);
        })
    }, [page]);

    const getPostList = useCallback(() => {
        setLoading(true);
        const url = `${apiUrl}list/?page=${page}&page_size=10`;
        axios.get(url).then((response) => {
            const lastPage = Math.ceil(response.data.count / 10);
            const tempPages = [];

            for(let i = 1; i <= lastPage; i++){
                tempPages.push(i);
            }
            setPages(tempPages);

            setPostList(response.data.results);
            setLoading(false);
        })
    });
    
    useEffect(getPostList, [page]);

  return (
    <>
    <PostSection>
        <PostTitleDiv>
            <FontAwesomeIcon onClick={getPostList} icon={faArrowsRotate} />
            <PostTitle>익명게시판</PostTitle>
            <CursorDiv>
                <FontAwesomeIcon onClick={goWrite} icon={faPenToSquare} />
            </CursorDiv>
            
        </PostTitleDiv>
        <PostListDiv>
            {loading ? (
                <LoadingDiv>
                    <LoadingImg src={loadingIcon} />
                </LoadingDiv>
            ) : isPost ? (
                <LoadingDiv>
                    아직 기록된 글이 없습니다. 
                </LoadingDiv>
            ) : (
                <ul>
                    {postList.map((element) => (
                      <EachPost key={element.id} title={element.title} 
                        postID={element.id} />
                    ))}
                </ul>
            )}
        
        </PostListDiv>
    </PostSection>
                            

    <PagingSection>
        {page > 1 ? (
            <PagenumberDiv onClick={() => {
                if(page > 1){
                    setPage(page-1)
                }
            }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </PagenumberDiv>
        ) : (
            <PageEmptyDiv></PageEmptyDiv>
        )}

        {/* // <PagenumberDiv onClick={() => {
        //     if(page > 1){
        //         setPage(page-1)
        //     }
        // }}>
        //     <FontAwesomeIcon icon={faArrowLeft} />
        // </PagenumberDiv> */}

        {pages.map(pageNum => (
            <PagenumberDiv key={pageNum} onClick={() => setPage(pageNum)}>{pageNum}</PagenumberDiv>
        ))}
        
        {/* <PagenumberDiv onClick={() => {
            if(pages.length > page) {
                setPage(page+1);
            }
        }}>
            <FontAwesomeIcon icon={faArrowRight} />
        </PagenumberDiv> */}
        
        {page < pages.length ? (
            <PagenumberDiv onClick={() => {
                if(pages.length > page) {
                    setPage(page+1);
                }
            }}>
                <FontAwesomeIcon icon={faArrowRight} />
            </PagenumberDiv>
        ) : (
            <PageEmptyDiv></PageEmptyDiv>
        )}
        
    </PagingSection>
    </>
  )
}

export default ShowPostList