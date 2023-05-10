// axios 요청이 들어가는 모든 모듈
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnimalList } from "../redux/modules/animalListSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  responseType: "json",
});

// 조회
const getAnimals = async () => {
  try {
    const { data: listOfAnimal } = await axiosInstance.get("/api/list");
    return listOfAnimal;
  } catch (error) {
    console.error(error);
  }
};

export { getAnimals };
