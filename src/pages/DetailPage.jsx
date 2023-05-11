import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetList } from "../hooks/useFetchs";
import Header from "../components/Header";
import useToggle from "../hooks/useToggle";
import { useSelector } from "react-redux";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isToggled, handleToggle, setToggled] = useToggle();
  const { animalList, dispatch } = useGetList();
  const userInfo = useSelector((state) => state.auth);

  // 동물 리스트 중 랜덤 3마리 뽑는 로직
  const selectedAnimal = animalList.filter((animal) => animal.animalNo === parseInt(id));

  // 임시보호 내용 문자열 필터링 함수
  const filterText = (data) => {
    const pattern = /<[^>]*>/g;
    let result = data.replace(pattern, "");
    result = !result ? "설명이 없습니다." : result;
    return result;
  };

  // 나이 문자열 치환 함수
  const getCleanAge = (age) => {
    const result = age.replace(/(\d+)\((세|개월)\)/g, "$1$2 ");
    return result;
  };

  // 상담 신청 버튼 prop
  const applyBtn = { title: "상담 신청하기" };

  // 상담 신청 버튼 클릭 핸들러
  const handleApplyClick = () => {
    navigate("/api/consulting");
  };

  // 로딩중일 때
  if (!selectedAnimal) {
    return <div>로딩중입니다...</div>;
  }

  return (
    <div>
      <Header userInfo={userInfo} />
      <article>
        <StVisuallyHidden>유기 동물 상세페이지 입니다.</StVisuallyHidden>
        {selectedAnimal.map((animal) => {
          return (
            <StContainer key={animal.animalNo}>
              <StImgContainer>
                <StTitleImg src={`https://${animal.images[0].imageUrl}`} alt="유기동물 프로필" />
              </StImgContainer>
              <StInfoContainer>
                {/* <button>{isToggled ? "⬆️" : "⬇️"}</button> */}
                {isToggled ? (
                  <StInfoContainerRigth>
                    <p>동물 번호 : {animal.animalNo}</p>
                    <p>입양 상태 : {animal.adpStatus}</p>
                    <p>입소 날짜 : {animal.entrance_date}</p>
                    <p>임시 보호 내용: {filterText(animal.tmpr)}</p>
                    {!animal.introduceUrl ? null : (
                      <a href={animal.introduceUrl} target="_blank" rel="noopener noreferrer">
                        동영상으로 만나보세요!
                      </a>
                    )}
                    <button onClick={handleToggle}>⬅️</button>
                  </StInfoContainerRigth>
                ) : (
                  <StInfoContainerLeft>
                    <p>이름 : {animal.name}</p>
                    <p>성별 : {animal.sex === "M" ? "수컷" : "암컷"}</p>
                    <p>
                      종 / 품종 : {animal.species}/{animal.breed}
                    </p>
                    <p>나이 : {getCleanAge(animal.age)}</p>
                    <p>체중 : {`${animal.weight}kg`}</p>
                    <button onClick={handleToggle}>➡️</button>
                  </StInfoContainerLeft>
                )}
              </StInfoContainer>
            </StContainer>
          );
        })}
        <Button button={applyBtn} onClickHandle={handleApplyClick} />
      </article>
    </div>
  );
};

export default DetailPage;

const StVisuallyHidden = styled.h1`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
`;

const StTitleImg = styled.img`
  display: block;
  width: 400px;
  height: 280px;
`;
const StImgContainer = styled.div`
  border-radius: 200px 200px 0px 0px;
  border: 12px solid rgb(17 57 113 / 19%);
  overflow: hidden;
  box-shadow: blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px,
    rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px,
    rgb(255, 85, 85) 40px -40px;
  margin-bottom: 50px;
`;

const StInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  /* border: 1px solid red; */
  text-align: left;
  box-sizing: border-box;
  padding: 0 10px;
  margin-bottom: 100px;
  border: 1px solid gray;
  align-items: center;
`;

const StInfoContainerLeft = styled.div`
  width: 50%;
`;

const StInfoContainerRigth = styled.div`
  width: 50%;
`;
