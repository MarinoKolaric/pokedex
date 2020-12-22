import React, { Dispatch, SetStateAction, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { theme } from "@style";
import { CloseButton, Loading, PokemonCard } from "@components";
import { IPokemonDetails, IType } from "@types";
import { usePokemonsGetByType } from "@hooks";
import { PokemonContext } from "@context";

type WrapperProps = {
  isOpen: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  background: rgba(51, 51, 51, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  padding: 8px;
`;

const Box = styled.div`
  ${theme.boxShadow};
  max-width: 900px;
  position: relative;
  background-color: ${theme.color.background};
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const Header = styled.div``;
const Body = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 12px 0;
  max-height: 400px;
  overflow: overlay;
`;

const ModalTitle = styled.div`
  text-align: center;
  height: 40px;
  font-size: ${theme.fontSize.md};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 200px;
`;

type Props = {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  type: IType | undefined;
};

export const Modal = ({ isOpen, setIsModalOpen, type }: Props) => {
  let history = useHistory();
  const { loading, error, pokemons } = usePokemonsGetByType();
  const {
    state: { typeFilter },
  } = useContext(PokemonContext);

  function handleClick({ id }: IPokemonDetails) {
    setIsModalOpen(false);
    history.push(`/pokemon/${id}`);
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Box>
        <Header>
          <ModalTitle>List of {typeFilter} pokemons</ModalTitle>
          <CloseButton onClick={() => setIsModalOpen(false)} />
        </Header>
        <Body>
          {loading && <Loading />}
          {error && 'Dogodila se greška'}
          {pokemons &&
            pokemons.map((x, i) => (
              <Container key={i} onClick={() => handleClick(x)}>
                <PokemonCard pokemon={x} />
              </Container>
            ))}
        </Body>
      </Box>
    </Wrapper>
  );
};
