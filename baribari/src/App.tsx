import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './page/Login';

export default function App() {
    return (
        <>
            <GlobalStyle />

            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}
