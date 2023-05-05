import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetList } from "../hooks/useFetchHooks";

const DetailPage = () => {
  const navigate = useNavigate();
  const [animalList, dispatch] = useGetList();
  const { id } = useParams();
  const selectedAnimal = animalList.filter((animal) => animal.ANIMAL_NO === parseInt(id));

  if (!selectedAnimal) {
    return <div>로딩중입니다...</div>;
  }

  const filterText = (data) => {
    const pattern = /<[^>]*>/g;
    let result = data.replace(pattern, "");
    result = !result ? "설명이 없습니다." : result;
    return result;
  };

  // 상담 신청 버튼
  const applyBtn = { title: "상담 신청하기" };

  return (
    <article>
      <StVisuallyHidden>유기 동물 상세페이지 입니다.</StVisuallyHidden>
      <img src="" alt="동물 프로필 사진" />
      {selectedAnimal.map((animal) => {
        return (
          <div key={animal.ANIMAL_NO}>
            <div>
              <p>이름 : {animal.ANIMAL_NO}</p>
              <p>성별 : {animal.SEXDSTN === "M" ? "수컷" : "암컷"}</p>
              <p>
                종 / 품종 :{animal.SPCS}/{animal.BREEDS}
              </p>
              <p>나이 : {animal.AGE}</p>
              <p>체중 : {animal.BDWGH}</p>
            </div>
            <div>
              <p>입양 상태 : {animal.ADP_STTUS}</p>
              <p>입소 날짜 : {animal.ENTRNC_DATE}</p>
              <p>임시 보호 상태 : {animal.TMPR_PRTC_STTUS}</p>
              <p>임시 보호 내용: {filterText(animal.TMPR_PRTC_CN)}</p>
              <p>동물 번호 : {animal.ANIMAL_NO}</p>
            </div>
          </div>
        );
      })}
      <Button button={applyBtn} />
    </article>
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
