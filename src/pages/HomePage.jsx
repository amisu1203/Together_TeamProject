import React, { useEffect, useState } from "react";
import TitleListAnimal from "../components/TItleListAnimal";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";

const HomePage = () => {
  const userInfo = useSelector((state) => state.auth);
  return (
    <div>
      <Header userInfo={userInfo} />
      <TitleListAnimal />
    </div>
  );
};

export default HomePage;
