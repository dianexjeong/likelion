import React from 'react';
import { 
HeaderDiv,  
SubHeaderDiv, } from '../styledComponent';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HeaderTitle from './HeaderTitle';

const Header = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    // darkMode 가 true 이면 false로,
    // false이면 true로
    setDarkMode((darkMode) => !darkMode);
  }

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  }

  return (
    <HeaderDiv>
      {/* 메모이제이션! */}
      <HeaderTitle goHome={goHome} />

      <SubHeaderDiv>
        {darkMode ? (
          <FontAwesomeIcon onClick={toggleDarkMode} icon={faSun} />
        ) : (
          <FontAwesomeIcon onClick={toggleDarkMode} icon={faMoon} />
        )}
      </SubHeaderDiv>
    </HeaderDiv>
  )
};

export default Header;