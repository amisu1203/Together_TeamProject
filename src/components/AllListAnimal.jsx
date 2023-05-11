import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetList } from "../hooks/useFetchs";

const AllListAnimal = () => {
  const navigate = useNavigate();
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(0);
  const targetRef = useRef(null);
  const { animalList } = useGetList();
  const limit = 5;

  // 필터 클릭 핸들러
  const handleFilterClicked = (e) => {
    let condition = e.target.innerText;
    if (selectedCondition.includes(condition)) {
      setSelectedCondition((prev) => prev.filter((prevCondition) => prevCondition !== condition));
    } else setSelectedCondition([...selectedCondition, condition]);
  };

  // 필터링 된 동물 목록
  const filteredAnimal = pets.filter((animal) =>
    selectedCondition.length === 0
      ? true
      : selectedCondition.every((condition) => {
          if (condition === "강아지" || condition === "고양이") {
            return animal.species === (condition === "강아지" ? "DOG" : "CAT");
          } else if (condition === "암컷" || condition === "수컷") {
            return animal.sex === (condition === "암컷" ? "W" : "M");
          } else {
            return false;
          }
        })
  );

  // 나이 문자열 치환 함수
  const getCleanAge = (age) => {
    const result = age.replace(/(\d+)\((세|개월)\)/g, "$1$2 ");
    return result;
  };

  // 상세 페이지 핸들링 함수
  const handleDetailPageClick = (id) => {
    navigate(`/api/detail/${id}`);
  };

  // 페이지에 따라서 pet 데이터 업데이트
  useEffect(() => {
    const fetchData = async () => {
      const startIndex = page * limit;
      if (page === 1) {
        setPets([...animalList].slice(0, limit));
      } else {
        setPets((prevPets) => {
          const newData = animalList.filter((item) => !prevPets.find((pet) => pet.animalNo === item.animalNo));
          return [...prevPets, ...newData];
        });
      }
    };
    fetchData();
  }, [page]);

  // 옵저버 객체 생성
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio >= 1) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: [1] }
    );
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
  }, []);

  return (
    <StContainer>
      <StFilterBtnContainer>
        <StFilterBtn onClick={handleFilterClicked} className={selectedCondition.includes("강아지") ? "selected" : ""}>
          강아지
        </StFilterBtn>
        <StFilterBtn onClick={handleFilterClicked} className={selectedCondition.includes("고양이") ? "selected" : ""}>
          고양이
        </StFilterBtn>
        <StFilterBtn onClick={handleFilterClicked} className={selectedCondition.includes("암컷") ? "selected" : ""}>
          암컷
        </StFilterBtn>
        <StFilterBtn onClick={handleFilterClicked} className={selectedCondition.includes("수컷") ? "selected" : ""}>
          수컷
        </StFilterBtn>
        {/* 필터링 조건 더보기 구현할지 말지 */}
      </StFilterBtnContainer>
      {[...filteredAnimal].slice(0, page * limit).map((animal) => (
        <StListContainer
          key={animal.animalNo}
          onClick={() => handleDetailPageClick(animal.animalNo)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDetailPageClick(animal.animalNo);
            }
          }}
        >
          <StTitleImg src={`https://${animal.images[0].imageUrl}`} alt="동물 프로필 사진" />
          <StInfoContainer>
            <StTxtInfo>이름 : {animal.name}</StTxtInfo>
            <StTxtInfo>나이 : {getCleanAge(animal.age)}</StTxtInfo>
            <StTxtInfo>성별 : {animal.sex === "M" ? "수컷" : "암컷"}</StTxtInfo>
            <StTxtInfo>
              종 : {animal.species} / {animal.breed}
            </StTxtInfo>
          </StInfoContainer>
        </StListContainer>
      ))}
      <div ref={targetRef} />
    </StContainer>
  );
};

export default AllListAnimal;

const StContainer = styled.div`
  margin-top: 130px;
`;

const StListContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin: 20px auto;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.3s ease-in-out;
  background-color: #ffefe7c4;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    cursor: pointer;
    background: #b2acaacb;
    color: #ffffff;
  }
  @media screen and (min-width: 920px) {
    max-width: 750px;
  }
  color: #5d5d5d;
`;

const StTitleImg = styled.img`
  width: 150px;
  height: 120px;
  border: 1px solid #e1e1e1;
  margin: 10px;
  box-sizing: border-box;
`;

const StInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: space-around;
  margin-left: 30px;
  justify-content: center;
  @media screen and (max-width: 790px) {
    min-width: 140px;
  }
`;

const StTxtInfo = styled.p`
  margin: 0;
`;

const StFilterBtnContainer = styled.div`
  /* border: 1px solid red; */
`;

const StFilterBtn = styled.button`
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px, rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #9c9c9c;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 12px 24px;
  text-align: center;
  touch-action: manipulation;
  transition: all 0.1s ease-in-out;
  margin-right: 10px;
  &.selected {
    color: #2260ff;
    border: 2px solid #2260ff;
    font-weight: 600;
    box-shadow: 0 5px 10px rgba(#6b84ad, 0.1), 0 0 0 4px #b5c9fc;
  }
`;
