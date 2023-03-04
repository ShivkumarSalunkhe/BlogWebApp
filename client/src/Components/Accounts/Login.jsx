import React, { useContext, useState } from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { API } from "../../service/api.js";
import { DataContext } from "../../Context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";
import ToastContext from "../../Context/ToastContext.jsx";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 7px 7px 7px 5px gray;
`;
const Image = styled(`img`)({
  width: 100,
  margin: "auto",
  display: "flex",
  paddingTop: "50px",
});

const Wrapper = styled(Box)`
  padding: 10px 35px;
  display: flex;
  text-align: center;
  flex-direction: column;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  height: 40px;
  margin-bottom: 20px;
  box-shadow: 5px 5px 5px gray;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  bordor-radius: 2px;
  height: 40px;
  background: #f2f2f2;
  box-shadow: 5px 5px 5px gray;
  margin-bottom: 20px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: red;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};
const loginInitialValues = {
  username: "",
  password: "",
};

function Login({ isUserAuthenticated }) {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");

  const { toast } = useContext(ToastContext);
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
      toast.success(response.data.msg);
    } else {
      setError("Something went wrong! Please try again");
      toast.error("Please Enter Valid Credentials");
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const response = await API.userLogin(login);
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      navigate("/");
      isUserAuthenticated(true);
      toast.success(response.data.msg);
    } catch (error) {
      setError("Something went wrong! Please try again later");
      error.display
        ? toast.error(error.display)
        : toast.error("Please Enter Valid Credentials");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={require("../../Assets/blog.png")} alt="loginicon" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              label="Enter Username"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              variant="standard"
            />
            <TextField
              label="Enter Password"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              type="password"
              variant="standard"
            />
            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Typography>OR</Typography>
            <SignupButton onClick={() => toggleSignup()} variant="text">
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              onChange={(e) => onInputChange(e)}
              label="Enter Name"
              name="name"
              variant="standard"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              label="Enter Username"
              name="username"
              variant="standard"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              label="Enter Password"
              name="password"
              variant="standard"
            />
            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Typography>OR</Typography>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
