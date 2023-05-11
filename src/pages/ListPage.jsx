import React from "react";
import Header from "../components/Header";
import AllListAnimal from "../components/AllListAnimal";
import { useSelector } from "react-redux";

function ListPage() {
  const userInfo = useSelector((state) => state.auth);
  return (
    <div>
      <Header userInfo={userInfo} />
      <AllListAnimal />
    </div>
  );
}

export default ListPage;
