import React, { useEffect, useMemo } from "react";
import { useGetList } from "../hooks/useFetchs";
import Button from "./Button";
import styled from "styled-components";
import dogFootPrint from "../img/footPrint.png";
import { useNavigate } from "react-router-dom";

const TitleListAnimal = () => {
  const { animalList } = useGetList();
  const navigate = useNavigate();

  const shuffledList = useMemo(() => [...animalList].sort(() => Math.random() - 0.5), [animalList]);
  const selectedList = shuffledList.slice(0, 3);

  // 나이 문자열 치환 함수
  const getCleanAge = (age) => {
    const result = age.replace(/(\d+)\((세|개월)\)/g, "$1$2 ");
    return result;
  };

  // 상세 페이지 핸들링 함수
  const handleDetailPageClick = (id) => {
    navigate(`/api/detail/${id}`);
  };

  // 더 보러가기 핸들링 함수
  const handleMoreInfoClick = () => {
    navigate("/api/list");
  };

  // 더 보러가기 버튼 props
  const moreInfoBtn = { title: "더 많은 유기동물 보기", purpose: "more info" };

  return (
    <main>
      <StMainTxt>
        <StTitleTxtContainer>
          <StTitleTxt>함께하개</StTitleTxt>
        </StTitleTxtContainer>
        에서 평생의 행복을 함께할 가족을 찾아보세요.
      </StMainTxt>
      {selectedList.map((animal) => {
        return (
          <StContainer
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
            <StContainerInfo>
              <StTxtInfo>이름 : {animal.name}</StTxtInfo>
              <StTxtInfo>나이 : {getCleanAge(animal.age)}</StTxtInfo>
              <StTxtInfo>성별 : {animal.sex === "M" ? "수컷" : "암컷"}</StTxtInfo>
              <StTxtInfo>
                종 : {animal.species} / {animal.breed}
              </StTxtInfo>
            </StContainerInfo>
          </StContainer>
        );
      })}
      <StButtonWrapper>
        <Button button={moreInfoBtn} onClickHandle={handleMoreInfoClick} />
      </StButtonWrapper>
      <StFootPrint src={dogFootPrint} />
    </main>
  );
};

export default TitleListAnimal;

const StContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 0 20px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: all 0.3s ease-in-out;
  background-color: #fff8f0d1;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    cursor: pointer;
  }
  @media screen and (min-width: 920px) {
    max-width: 750px;
  }
`;

const StMainTxt = styled.h2`
  margin: 140px 0 40px;
  font-size: 25px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: center;
  line-height: 30px;
  @media screen and (min-height: 980px) {
    margin-bottom: 90px;
  }
`;

const StTitleTxtContainer = styled.div`
  margin-right: -7px;
`;

const StTitleTxt = styled.p`
  font-weight: 800;
  font-size: 29px;
  color: #ffab1a;
  background-color: transparents;
  border: none;
  width: 120px;
`;

const StTitleImg = styled.img`
  width: 150px;
  height: 120px;
  border: 1px solid #e1e1e1;
  margin: 10px;
  box-sizing: border-box;
`;

const StContainerInfo = styled.div`
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

const StButtonWrapper = styled.div`
  max-width: 300px;
  margin: 0 auto;
  padding: 0 30px;
  box-sizing: border-box;
`;

const StFootPrint = styled.img`
  width: 180px;
  height: 160px;
  position: absolute;
  bottom: -20px;
  right: 20%;
  transform: rotate(344deg);
  @media screen and (max-width: 790px) {
    max-width: 100px;
    max-height: 100px;
    right: 25%;
  }
`;
