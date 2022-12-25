import React, { useState, useEffect } from 'react';
import {
    Button,
    Box,
    TextField,    
    InputAdornment,
    Link
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    HowToReg    
} from '@mui/icons-material';

import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../store/auth/authSlices';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { Navigate, Outlet } from 'react-router-dom';

const initalValues = {
    email: "",
    password: ""
};

const validationSchema = yup.object({
    email: yup
        .string()
        .required('Please Enter your Email')
        .email("Invalid email"),

    password: yup
        .string()
        .required('Please Enter your password')    
    
});



const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //select state from store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

     useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/dashboard')
          toast.success("Logged in Successfully")
        }    
        
    //     //dispatch(reset())
     }, [user, isError, isSuccess, message, navigate])
    // if(isSuccess) 
    //     return <Navigate to="/dashboard" />
        

    const handleSubmit = (values, formikHelpers) => {
        console.log(values)
        dispatch(loginUserAction(values))
        formikHelpers.resetForm()
    }

    return (
        <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, isValid, touched, dirty }) => (
                <Form className='register-form'>
                    <Field
                        name="email"
                        type="email"
                        as={TextField}
                        variant="outlined"
                        color="success"
                        label="Email"
                        //required="true"
                        size="large"
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        error={Boolean(errors.email) && Boolean(touched.email)}
                        helperText={Boolean(touched.email) && errors.email}

                    />
                    <Box height={20} />
                    <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        as={TextField}
                        variant="outlined"
                        color="success"
                        label="Password"
                        size="large"
                        //required="true"
                        fullWidth
                        InputProps={{
                            style: { fontSize: 16 },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </Box>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        error={Boolean(errors.password) && Boolean(touched.password)}
                        helperText={Boolean(touched.password) && errors.password}

                    />
                    <Box height={20} />                   
                    
                    <Button
                        type="submit"
                        startIcon={<HowToReg />}
                        color="success"
                        variant="contained"
                        size='small'
                        sx={{ fontSize: '1.3rem' }}
                        disabled={!isValid || !dirty}
                    >
                        Sign In
                    </Button>
                    <h2 style={{marginTop: 20}}>Haven't created account yet? Please <Link href="/register">Register</Link></h2>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm