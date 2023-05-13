import React from "react";
import { TitleBig, TitleSmall, TitleLogoDiv } from "../styledComponent";

const HeaderTitle = ({ goHome }) => {
  return (
    <>
      <TitleLogoDiv onClick={goHome}>
        <TitleBig>멋사</TitleBig>
        <TitleSmall>익명게시판</TitleSmall>
      </TitleLogoDiv>
    </>
  );
};

export default React.memo(HeaderTitle);
