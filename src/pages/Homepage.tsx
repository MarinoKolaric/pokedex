import React, {
  useContext,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Header, Loading, PokemonCard, SearchDashboard } from "@components";
import { usePokemonsGet } from "@hooks";
import { PokemonContext } from "@context";
import {  IPokemonDetails } from "@types";

const PokemonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 24px;
  margin: 8px;
`;

const PokemonContainer = styled.div`
  cursor: pointer;
  width: 300px;
`;

export const HomePage = () => {
  let history = useHistory();
  const {
    state: { limit, offset, searchedPokemon },
    dispatch,
  } = useContext(PokemonContext);

  const { loading, error, hasMore, pokedex } = usePokemonsGet({
    offset,
    limit,
  });

  const observer = useRef() as React.MutableRefObject<any>;

  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({
            type: "SET_OFFSET",
            payload: offset + limit,
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, limit, dispatch, offset]
  );

  function handleClick({ id }: IPokemonDetails) {
    history.push(`/pokemon/${id}`);
  }

  useEffect(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: 0,
    });

    dispatch({
      type: "SEARCHED_POKEMON",
      payload: null,
    });
  }, [dispatch]);

  return (
    <>
      <Header />
      <PokemonsContainer>
        <SearchDashboard />
        {searchedPokemon ? (
          <PokemonContainer onClick={() => handleClick(searchedPokemon)}>
            <PokemonCard pokemon={searchedPokemon} />
          </PokemonContainer>
        ) : (
          pokedex.map((pokemon: IPokemonDetails, i: number) => {
            if (pokedex.length === i + 1) {
              return (
                <PokemonContainer
                  key={i}
                  ref={lastPokemonRef}
                  onClick={() => handleClick(pokemon)}
                >
                  <PokemonCard pokemon={pokemon} />
                </PokemonContainer>
              );
            } else {
              return (
                <PokemonContainer key={i} onClick={() => handleClick(pokemon)}>
                  <PokemonCard pokemon={pokemon} />
                </PokemonContainer>
              );
            }
          })
        )}

        {loading && <Loading />}
        {error && "Error"}
      </PokemonsContainer>
    </>
  );
};
