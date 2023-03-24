// yarn add @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from './styles';
import { Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import { Main, MediaDiv } from "./styledComponent";

import Header from "./pages/Header";
import Slogun from "./pages/Slogun";
import ShowPostList from "./pages/ShowPostList";
import WritePost from "./pages/WritePost";
import ShowPost from "./pages/ShowPost";
import Footer from "./pages/Footer";

const apiUrl = "https://reactapitest.pythonanywhere.com/api/";

function App() {
    // 다크모드 
    const [darkMode, setDarkMode] = useState(true);

    return (
        <>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <GlobalStyles />

                <MediaDiv>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />

                    {/* MAIN */}
                    <Main>
                        {/* React.memo 메모이제이션 */}
                        <Slogun />

                        <Routes>
                            <Route path="/" element={<ShowPostList apiUrl={apiUrl}/>}/>
                            <Route path="/wrtie" element={<WritePost apiUrl={apiUrl} />} />
                            <Route path="/post/:postID" element={<ShowPost apiUrl={apiUrl} />} />
                        </Routes>
                    </Main>

                </MediaDiv>
            </ThemeProvider>
            {/* FOOTER */}
            <Footer />
        </>
    )
}

export default App;
