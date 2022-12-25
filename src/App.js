import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import List from "./pages/List";
import Single from "./pages/Single";
import New from "./pages/New";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs } from "./formSource";
import ProtectedRoute from "./utils/ProtectedRoute";




function App() {

    const { darkMode } = useContext(DarkModeContext);

    return (
        // <Register />
        //<Login />
        <>  
            <div className={darkMode ? "app dark" : "app"}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />  
                                    
                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />   

                        <Route path="/users" element={
                            <ProtectedRoute>
                                <List />
                            </ProtectedRoute>
                        } />  
                        <Route path="/users/:userId" element={
                            <ProtectedRoute>
                                <Single />
                            </ProtectedRoute>
                        } />    
                        <Route
                            path="/users/new"
                            element={
                                <ProtectedRoute>
                                    <New inputs={userInputs} title="Add New User" />
                                </ProtectedRoute>                                
                            }
                        />         
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
            </div>
        </>
    );
}

export default App;
