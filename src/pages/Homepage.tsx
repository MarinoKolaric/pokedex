import React, { useContext, useRef, useCallback, useState } from "react";
import styled from "styled-components";
import { Header } from "@components";
import { usePokemonsGet } from "@hooks";
import { PokemonContext } from "@context";
import { IPokemon } from "@types";

const PokemonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 24px;
  margin: 8px;
`;

const PokemonContainer = styled.div`
  padding: 24px;
  margin: 8px;
  background: #333;
  color: #fff;
  cursor: pointer;

  width: 300px;
  height: 300px;
`;

export const Homepage = () => {
  const [offset, setOffset] = useState<number>(0);
  const { loading, error, hasMore } = usePokemonsGet({
    offset: offset,
  });
  const {
    state: { pokemons },
  } = useContext(PokemonContext);

  const observer = useRef() as React.MutableRefObject<any>;

  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset: number) => prevOffset + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Header />
      <PokemonsContainer>
        {pokemons.map((pokemon: IPokemon, i: number) => {
          if (pokemons.length === i + 1) {
            return (
              <PokemonContainer key={i} ref={lastPokemonRef}>
                {pokemon.name}
              </PokemonContainer>
            );
          } else {
            return <PokemonContainer key={i}>{pokemon.name}</PokemonContainer>;
          }
        })}

        {loading && "Loading..."}
        {error && "Error"}
      </PokemonsContainer>
    </>
  );
};
