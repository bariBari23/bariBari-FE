import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './page/Login';
import Home from './page/Home';

export default function App() {
    return (
        <>
            <GlobalStyle />

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}
