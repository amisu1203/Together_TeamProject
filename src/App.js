import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FormConsultPage from "./pages/FormConsultPage";
import styled from "styled-components";

function App() {
  return (
    <StContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/api/detail/:id" element={<DetailPage />} />
          <Route path="/api/consulting" element={<FormConsultPage />} />
        </Routes>
      </BrowserRouter>
    </StContainer>
  );
}

const StContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
`;

export default App;
