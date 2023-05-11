import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/modules/auth";

const Header = ({ userInfo }) => {
  const navigate = useNavigate();
  const [localUserInfo, setLocalUserInfo] = useState(null); // 로컬 상태로 유저 정보 저장
  const dispatch = useDispatch();

  useEffect(() => {
    // 유저 정보 확인
    const userInfoFromCookie = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfoFromCookie) {
      setLocalUserInfo(userInfoFromCookie);
    }
  }, []);

  // accessToken 가져오기
  const { accessToken } = useSelector((state) => state.auth);

  // 로그인 페이지 이동
  const handleLoginBtnClick = () => {
    navigate("/api/login");
  };

  // 로그아웃
  const handleLogoutBtnClick = () => {
    dispatch(logout()); // 로그아웃 액션 디스패치
    alert("로그아웃 되었습니다!");
    navigate("/"); // 로그아웃 후 리다이렉트할 경로 설정
  };

  // 회원가입 페이지 이동
  const handleSignUpBtnClick = () => {
    navigate("/api/signup");
  };

  return (
    <StHeader>
      <Logo>함께하개</Logo>
      <div>
        {userInfo.user ? (
          <>
            <StUserInfo>{`${userInfo.user.username}님 환영합니다!`}</StUserInfo>
            <StLogoutBtn onClick={handleLogoutBtnClick}>로그아웃</StLogoutBtn>
          </>
        ) : (
          <StLogoutBtn>
            <StLoginBtn onClick={handleLoginBtnClick}>로그인</StLoginBtn>
            <StLoginBtn onClick={handleSignUpBtnClick}>회원가입</StLoginBtn>
          </StLogoutBtn>
        )}
      </div>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  background-color: #f5f5f5;
  /* background: rgb(252, 212, 188);
  background: linear-gradient(180deg, rgba(252, 212, 188, 1) 0%, rgba(255, 188, 120, 0.821187850140056) 8%, rgba(255, 255, 255, 0) 70%); */
  height: 100px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  @media screen and (min-height: 1000px) {
    padding: 0 300px;
  }
`;

const StUserInfo = styled.div`
  position: absolute;
  right: 200px;
  top: 10px;
  padding: 10px;
  border: 1px solid gray;
`;

const StLoginBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 14px;
`;

const StLogoutBtn = styled.button`
  position: absolute;
  right: 200px;
  top: 60px;
  border: none;
  background-color: transparent;
  font-size: 14px;
`;
