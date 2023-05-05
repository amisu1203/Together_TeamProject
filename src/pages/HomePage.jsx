import React from "react";
import Header from "../components/Header";
import TitleListAnimal from "../components/TItleListAnimal";
import Button from "../components/Button";

const HomePage = () => {
  const signUpBtn = { title: "회원가입" };
  const loginBtn = { title: "로그인" };
  return (
    <div>
      <Header />
      <Button button={signUpBtn} />
      <Button button={loginBtn} />
      <TitleListAnimal />
    </div>
  );
};

export default HomePage;
