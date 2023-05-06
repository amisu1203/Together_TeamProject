import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import styled from "styled-components";

const StContainer = styled.div`
  background: linear-gradient(rgb(252 212 188 / 61%), rgb(255 172 87 / 33%), rgb(255, 255, 255) 17%);
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StContainer>
      <App />
    </StContainer>
  </Provider>
);
