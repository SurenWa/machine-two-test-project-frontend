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
import { registerUserAction } from '../store/auth/authSlices';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


const initalValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const validationSchema = yup.object({
    name: yup.string().required('Please enter your username'),
    email: yup
        .string()
        .required('Please Enter your Email')
        .email("Invalid email"),

    password: yup
        .string()
        .required('Please Enter your password')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm password')
        .oneOf([yup.ref("password"), null], "Passwords must match")
});



const RegisterForm = () => {

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
    //const { loading, appErr, serverErr, registered } = storeData;
    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess) {
          navigate('/dashboard')
          toast.success("Registered Successfully")
        }    
        //dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleSubmit = (values, formikHelpers) => {
        //console.log(values)
        dispatch(registerUserAction(values))
        formikHelpers.resetForm()
        //toast.success("Registered Successfully.Please verify your email.")
    }

    //redirect
    if (isLoading) {
        return <Spinner />
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
                        name="name"
                        type="text"
                        as={TextField}
                        variant="outlined"
                        color="success"
                        label="User Name"
                        size="large"
                        //required=true
                        fullWidth
                        InputProps={{ style: { fontSize: 16 } }}
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        error={Boolean(errors.name) && Boolean(touched.name)}
                        helperText={Boolean(touched.name) && errors.name}

                    />
                    <Box height={20} />
                   
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

                    <Field
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        as={TextField}
                        variant="outlined"
                        color="success"
                        label="Confirm Password"
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
                        error={Boolean(errors.confirmPassword) && Boolean(touched.confirmPassword)}
                        helperText={Boolean(touched.confirmPassword) && errors.confirmPassword}

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
                        Sign Up
                    </Button>
                    <h2 style={{marginTop: 15}}>Already have an account? Please <Link href="/">login</Link></h2>
                </Form>
            )}
        </Formik>

    )
}

export default RegisterForm