import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@style";
import { Header } from "@components";

const Container = styled.div`
  padding: 32px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



export const Homepage = () => {
  return (
    <>
      <Header />
      <Container>
        Homepage
      </Container>
    </>
  );
};
