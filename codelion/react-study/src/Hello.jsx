import React from "react";
import styled from 'styled-components';
import "./Hello.css";

function Hello() {
  const StyleButton = styled.button`
    color: red;
    background-color: gray;
  `;
  const PracticeStyle = {  //Carmel Case로 작성
    marginTop: '10px',
    backgroundColor: 'blue',
  };
  return(
    <>
      <div style={PracticeStyle}>Hello World!</div>
      <div style={PracticeStyle}>Hello World!</div>
      <div style={PracticeStyle}>Hello World!</div>
      <div className="red">Hello World!</div>
      <div className="red">Hello World!</div>
      <div className="red">Hello World!</div>
      <StyleButton>나만의 버튼</StyleButton>
    </>
  );
}
export default Hello

