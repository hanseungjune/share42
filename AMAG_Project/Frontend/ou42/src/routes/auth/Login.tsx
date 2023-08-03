/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Btn from "../../components/UI/Btn";
import logo from "../../assets/logo.png";
import Circle from "../../components/UI/Circle";
import { container } from "../../styles/auth/Login";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TokenStorage } from "./../../hooks/tokenStorage";

const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
export default function Login() {
  const tokenStorage = new TokenStorage();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation(
    (loginData: { loginid: string; loginpassword: string }) =>
      axios({
        url: `${HTTPS_URL}/login`,
        method: "POST",
        data: loginData,
      }),
    {
      onSuccess: (response) => {
        tokenStorage.setToken(response.data);
        navigate("/home");
      },
      onError: (error) => {
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ loginid: id, loginpassword: password });
    // 이걸 GET 요청을 ReactQuery로 하고싶다.
  };

  return (
    <div css={container}>
      <div className="back"></div>
      <div className="logo">
        <img src={logo} alt="logo" height="300" width="300" />
      </div>
      <form className="loginInput" onSubmit={handleLogin}>
        <TextField
          size="small"
          className="textField"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          sx={{ zIndex: "2" }}
        />
        <TextField
          size="small"
          className="textField"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          sx={{ zIndex: "2" }}
        />
        <Btn
          width="35%"
          height="12%"
          content="로그인"
          borderR={10}
          marginTop={20}
          boxShadow={"-1px 2px 1px 2px rgba(209, 77, 114, 0.25)"}
          backGroundColor="#FFABAB"
          border={0}
          color={"white"}
        />
        <div className="btn">
          <div className="link">
            <div className="signUp" onClick={() => navigate("/signup")}>
              회원가입
            </div>
            <div className="admin" onClick={() => navigate("/admin/login")}>
              관리자 로그인
            </div>
          </div>
        </div>
      </form>
      <Circle />
    </div>
  );
}
