import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {auth} from "./firebaseConfig";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

const PrivateRoute = ({element: Element}) => {
    const isAuthenticated = auth.currentUser !== null;

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return <Element/>;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage/>}
                />
                <Route
                    path="/home"
                    element={<PrivateRoute element={HomePage}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
