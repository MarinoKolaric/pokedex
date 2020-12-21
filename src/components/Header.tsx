import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "@images/logo.png";
import { theme } from "@style";

const HeaderComponent = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 2px solid ${theme.color.gray};
`;

const LogoWrapper = styled(Link)`
  width: 120px;
  padding: 0 12px;
`;

const Logo = styled.img`
  width: 100%;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
`;

export const Header = () => {
  return (
    <HeaderComponent>
      <LogoWrapper to="/">
        <Logo src={logo} alt="pokeball logo"></Logo>
      </LogoWrapper>
      <Title>Pokedex</Title>
    </HeaderComponent>
  );
};
