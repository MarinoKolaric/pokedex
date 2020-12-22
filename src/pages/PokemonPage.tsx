import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Header, Loading, Modal, PokemonCard } from "@components";
import { usePokemonGet } from "@hooks";
import { IType } from "@types";
import { PokemonContext } from "@context";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 24px;
  margin: 8px;
`;

const CardWrapper = styled.div`
  width: 300px;
`

export const PokemonPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<IType>();
  const { pokemonId } = useParams<Record<string, string>>();

  const { loading, error, pokemon } = usePokemonGet(+pokemonId);
  const {
    dispatch,
  } = useContext(PokemonContext);

  function handleOpening(type?: IType) {
    if (!type) return;
    setIsModalOpen(true);
    setSelectedType(type);

    dispatch({
      type: "SET_TYPE_FILTER",
      payload: type.type.name,
    });
  }

  return (
    <>
      <Header />
      <Container>
        {loading && <Loading />}
        {error && "error"}
        {pokemon && (
          <CardWrapper>
            <PokemonCard
              pokemon={pokemon}
              withDetails
              handleOnTypeClick={handleOpening}
            />
          </CardWrapper>
        )}
        {/* This check is necessary, because if a render Modal it will call API for no reason */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type={selectedType}
          />
        )}
      </Container>
    </>
  );
};
