import {
    Main,
    MediaDiv,
} from './styledComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, GlobalStyles } from './styles';
import { useState } from 'react';
import Header from './Header';
import Slogun from './Slogun';
import ShowPostList from './ShowPostList';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import ShowPost from './ShowPost';
import WritePost from './WritePost';

const API_URL = "https://reactapitest.pythonanywhere.com/api/";

function App() {
    const initialPostList = [
        { id: 1, title: ', 시사N 대학기자상 취재', replCount: 1},
        { id: 2, title: '학보, 시사N 대학기자상 취재', replCount: 43},
        { id: 3, title: '학보, 시사N 대학기자상 취재', replCount: 2},
    ]
    const [darkMode, setDarkMode] = useState(true);
    
    return (
        <>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <GlobalStyles />
                <MediaDiv>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>

                    <Main>
                        <Slogun />
                        <Routes>
                            <Route 
                                path="/"
                                element={<ShowPostList apiUrl={API_URL}/>}></Route>
                            <Route path="/write" element={<WritePost apiUrl={API_URL} />} />
                            <Route path="/post/:postID" element={<ShowPost apiUrl={API_URL} />} />
                        </Routes>
                        
                    </Main>

                    
                </MediaDiv>
            </ThemeProvider>
            <Footer/>
        </>
    );
}

export default App;
