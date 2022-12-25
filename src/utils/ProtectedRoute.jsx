import React from "react";
import { useSelector } from "react-redux";
//import { Route, Redirect } from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    //check if user is loggin
    const user = useSelector(state => state?.auth);
    //const navigate = useNavigate()
    const { isSuccess } = user;

    if(!isSuccess) {
        return <Navigate to="/" replace />;
    }

    return children
    // return (
    //     // <>
    //     // <Routes>
    //     //     <Route
    //     //         {...rest}
    //     //         render={() =>
    //     //             isSuccess ? <Component {...rest} /> : <Navigate to="/login" />
    //     //         }  
    //     //     />
    //     // </Routes>
    //     // </>
    //     isSuccess ?  <Outlet /> : <Navigate to="/" />
    // );
};

export default ProtectedRoute;