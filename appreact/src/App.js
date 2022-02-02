import React from "react";
import styles from "./App.module.css";
import styled, { css } from "styled-components";
const Button = styled.a`
  display: inline-block;
  border-radius: 4px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  color: white;
  border: 2px solid white;
  background: transparent;
  text-align: center;
  text-decoration: none;
  ${(props) =>
    props.primary
      ? css`
          background: black;
        `
      : css`
          color: #3c3c3c;
          background: white;
          border: 2px solid #3c3c3c;
        `}
`;

const App = () => {
  return (
    <div>
      <h1 className={`${styles["text-center"]} ${styles["font-bold"]}`}>App</h1>
      <Button
        primary
        href="https://es.reactjs.org/"
        target="_blank"
        rel="noopener"
      >
        React
      </Button>
      <Button href="https:/google.com/" target="_blank" rel="noopener">
        Google
      </Button>
    </div>
  );
};

export default App;
