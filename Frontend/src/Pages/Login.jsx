import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const url = "https://moviesserver.onrender.com";
  const dispatch = useDispatch();
  const toast = useToast();
  const handleLogin = async () => {
    try {
      let res = await axios.post(`${url}/users/login`, {
        email: email,
        password: password,
      });
      console.log(res);
      res = res.data;
      console.log(res, "ress");
      if (res.token) {
        console.log(res.token);
        localStorage.setItem("movietoken", res.token);
        toast({
          title: "Saved",
          description: "Login Succesfull",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log("coming infalied");
        toast({
          title: "Login Unsuccessful",
          description: `${res.message}`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Login Unsuccessful",
        description: `${err.response.data.message}`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Div>
      <DIV>
        <h1>Log in now !!</h1>
        <h2>your movies are waiting for you 🥳🥳</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="user-login" onClick={handleLogin}>
          Log In
        </button>
        <br />
        <p className="p2">
          Dont have an account? create now!!{" "}
          <Link className="Link" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </DIV>
    </Div>
  );
};

const Div = styled.div`
  height: 100vh;
`;
const DIV = styled.div`
  width: 400px;
  padding: 20px 0px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid gray;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.332) 1.95px 1.95px 2.6px;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  height: 60%;
  h1 {
    font-size: 2rem;
    font-weight: 800;
    text-align: left;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 400;
  }
  input {
    width: 80%;
    height: 30px;
    font-size: larger;
    font-weight: 200;
  }
  .Link {
    color: #6b21ff;
    font-weight: 800;
    font-size: 1.2rem;
  }
  button {
    width: 150px;

    background-color: #6b21ff;
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }
  button:hover {
    width: 150px;
    color: white;

    background-color: #6b21ffa1;
    font-weight: 800;
    border: 2px solid #6b21ffb7;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    width: 80%;
  }
`;

export default Login;
