import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetList } from "../hooks/useFetchs";

const ListPage = () => {
  const { animalList, dispatch } = useGetList();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadMore();
  }, []);

  function loadMore() {
    axios
      .get(`https://example.com/api/items?page=${page}`)
      .then((response) => {
        setItems([...items, ...response.data.items]);
        setPage(page + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMore();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  if (!animalList) {
    return <div>로딩 중입니다.</div>;
  }
  return (
    <div>
      <Header />
      <StTitleTxt>유기 동물 목록 페이지임</StTitleTxt>
      <div>
        {animalList.map((animal) => {
          return (
            <>
              <p>동물 번호 : {animal.animalNo}</p>
              <p>입양 상태 : {animal.adpStatus}</p>
              <p>입소 날짜 : {animal.entrance_date}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListPage;

const StTitleTxt = styled.h2`
  margin-top: 150px;
`;
