import React, {  useState } from 'react'
import { TextField, Box, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';


const Component = styled(Box)`
    width: 400px;
    margin:auto;
    box-shadow: 7px 7px 7px 5px gray;

    `
const Image = styled(`img`)({
    width: 100,
    margin: 'auto',
    display: 'flex',
    paddingTop: '50px'
})


const Wrapper = styled(Box)`
    padding:10px 35px;
    display:flex;
    flex-direction :column;
    flex:1;  
    & >div, & > button,&>p{
        margin-top:20px;
    }
`
const LoginButton = styled(Button)`
    text-transform:none;
    height:40px;
    margin-bottom:20px;
    box-shadow: 5px 5px 5px gray;
`

const SignupButton = styled(Button)`
    text-transform:none;
    bordor-radius:2px;
    height:40px;
    background:#f2f2f2;
    box-shadow: 5px 5px 5px gray;
    margin-bottom:20px;

`

function Login() {
    const [account, toggleAccount] = useState('login');

    const toggleSignup=()=>{
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
    }

    const onInputChange=(e)=>{
        console.log(e.target.value);
    }
    return (
        <Component>
            <Box>
                <Image src={require('../../Assets/blog.png')} alt='loginicon' />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField label="Enter Username" variant="standard" />
                            <TextField label="Enter Password" variant="standard" />
                            <LoginButton variant="contained">Login</LoginButton>
                            <Typography>OR</Typography>
                            <SignupButton onClick={()=>toggleSignup()} variant="text">Create an account</SignupButton>
                        </Wrapper> 
                    :
                        <Wrapper>
                            <TextField onChange={(e)=>onInputChange(e)} label="Enter Name" variant="standard" />
                            <TextField onChange={(e)=>onInputChange(e)} label="Enter Username" variant="standard" />
                            <TextField onChange={(e)=>onInputChange(e)} label="Enter Password" variant="standard" />
                            <SignupButton>Signup</SignupButton>
                            <Typography>OR</Typography>
                            <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login