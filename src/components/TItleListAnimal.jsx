import React, { useMemo, useState, useEffect } from "react";
import { useGetList, fetchAnimalPhotos } from "../hooks/useFetchs";
import Button from "./Button";
import styled from "styled-components";
import dogFootPrint from "../img/footPrint.png";
import { useNavigate } from "react-router-dom";

const TitleListAnimal = () => {
  const { animalList, dispatch } = useGetList();
  const navigate = useNavigate();

  const shuffledList = useMemo(() => [...animalList].sort(() => Math.random() - 0.5), [animalList]);
  const selectedList = shuffledList.slice(0, 3);

  // 나이 문자열 치환 함수
  const getCleanAge = (age) => {
    const result = age.replace(/(\d+)\((세|개월)\)/g, "$1$2 ");
    return result;
  };

  // 더 보러가기 버튼 핸들링 함수
  const handleMoreInfoClick = (id) => {
    navigate(`/api/detail/${id}`);
  };
  const moreInfoBtn = { title: "더 보러가기", purpose: "more info" };
  return (
    <main style={{ position: "relative" }}>
      <StMainTxt>
        <StTitleTxt>함께하개</StTitleTxt>에서 평생의 행복을 함께할 가족을 찾아보세요.
      </StMainTxt>
      {selectedList.map((animal) => {
        return (
          <StContainer
            key={animal.ANIMAL_NO}
            onClick={() => handleMoreInfoClick(animal.ANIMAL_NO)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMoreInfoClick(animal.ANIMAL_NO);
              }
            }}
          >
            <StTitleImg src="animal.images[0]" alt="동물사진1" />
            <StContainerInfo>
              <StTxtInfo>이름 : {animal.NM}</StTxtInfo>
              <StTxtInfo>나이 : {getCleanAge(animal.AGE)}</StTxtInfo>
              <StTxtInfo>성별 : {animal.SEXDSTN === "M" ? "수컷" : "암컷"}</StTxtInfo>
              <StTxtInfo>
                종 : {animal.SPCS} / {animal.BREEDS}
              </StTxtInfo>
            </StContainerInfo>
          </StContainer>
        );
      })}
      <StButtonWrapper>
        <Button button={moreInfoBtn} />
      </StButtonWrapper>
      <StFootPrint src={dogFootPrint} />
    </main>
  );
};

export default TitleListAnimal;

const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  margin: 0 200px;
  margin-bottom: 20px;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    cursor: pointer;
  }
`;

const StMainTxt = styled.h2`
  margin-bottom: 40px;
  font-weight: 500;
  @media screen and (min-height: 980px) {
    margin-bottom: 90px;
  }
`;

const StTitleTxt = styled.span`
  font-weight: 800;
  color: #ffab1a;
`;

const StTitleImg = styled.image`
  width: 150px;
  height: 120px;
  border: 1px solid #e1e1e1;
  margin: 10px;
  box-sizing: border-box;
  background-color: #242424;
`;

const StContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: space-around;
  margin-left: 30px;
  justify-content: center;
`;

const StTxtInfo = styled.p`
  margin: 0;
`;

const StButtonWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  right: 17%;
`;

const StFootPrint = styled.img`
  width: 180px;
  height: 160px;
  position: absolute;
  bottom: -20px;
  right: 10%;
  transform: rotate(344deg);
`;
