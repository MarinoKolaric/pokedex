import React from "react";

import styled, { keyframes } from "styled-components";
import { theme } from "@style";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 8px;
  width: 100%;
`

const Spinner = keyframes`
    0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 16px solid ${theme.color.gray};
  border-radius: 50%;
  border-top: 16px solid ${theme.color.grayDarker};
  width: 120px;
  height: 120px;
  animation: ${Spinner} 2s linear infinite;
`;

const Text = styled.h2`
  color: ${theme.color.grayDarker};
  font-size: ${theme.fontSize.lg};
  padding: 12px 0;
`;

export const Loading = () => {
  return (
    <Wrapper>
      <Loader />
      <Text>Catching Pokemons from API...</Text>
    </Wrapper>
  );
};
