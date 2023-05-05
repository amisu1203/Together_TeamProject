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
      const listOfAnimal = (await axiosInstance.get("/")).data.TbAdpWaitAnimalView.row;
      dispatch(setAnimalList(listOfAnimal));
    };
    getListOfAnimal();
  }, [dispatch]);

  const animalList = useSelector((state) => state.animalList);

  return [animalList, dispatch];
};

export const fetchAnimalPhotos = async (animal_NO) => {
  try {
    const response = await axios.get(
      `http://openapi.seoul.go.kr:8088/6b53454b47616d6934344d7a585076/json/TbAdpWaitAnimalPhotoView/1/5/?STAGE_SN=2&fileNm=${animal_NO}`
    );
    const photos = response.data.TbAdpWaitAnimalPhotoView.row;
    console.log(photos);
    return photos;
    // photos는 5개 url 담긴 배열!
  } catch (error) {
    console.error(error);
  }
};
