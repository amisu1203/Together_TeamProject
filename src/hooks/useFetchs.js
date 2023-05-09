import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnimalList } from "../redux/modules/animalListSlice";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
export const useGetList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getListOfAnimal = async () => {
      try {
        // const { data: listOfAnimal } = await axiosInstance.get("/api/list");
        const data = await axiosInstance.get("/api/list");
        console.log(data);
        // 공공 api 사용시 요청 로직
        // const { data } = await axiosInstance.get("/");
        // const listOfAnimal = data.TbAdpWaitAnimalView.row;

        dispatch(setAnimalList(listOfAnimal));
      } catch (error) {
        console.error(error);
      }
    };
    getListOfAnimal();
  }, [dispatch]);

  const animalList = useSelector((state) => state.animalList);

  return { animalList, dispatch };
};
