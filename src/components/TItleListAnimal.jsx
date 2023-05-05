import React, { useMemo, useState, useEffect } from "react";
import { useGetList, fetchAnimalPhotos } from "../hooks/useFetchHooks";
import Button from "./Button";

const TitleListAnimal = () => {
  const [animalList, dispatch] = useGetList();
  const shuffledList = useMemo(() => [...animalList].sort(() => Math.random() - 0.5), [animalList]);
  const selectedList = shuffledList.slice(0, 3);

  const moreInfoBtn = { title: "더보기" };
  return (
    <main>
      <div>
        <h2>타이틀 애니멀</h2>
        {selectedList.map((animal) => {
          return (
            <div key={animal.ANIMAL_NO}>
              <div>사진</div>
              <p>이름 : {animal.NM}</p>
              <p>나이 : {animal.AGE}</p>
              <p>성별 : {animal.SEXDSTN === "M" ? "수컷" : "암컷"}</p>
              <p>
                종 : {animal.SPCS} / {animal.BREEDS}
              </p>
            </div>
          );
        })}
      </div>
      <Button button={moreInfoBtn} />
    </main>
  );
};

export default TitleListAnimal;
