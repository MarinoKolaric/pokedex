import React, { Dispatch, createContext, useReducer } from "react";
import { pokemonReducer } from "@reducers";
import { IPokemonState, PokemonAction } from "@types";

interface IContextProps {
  state: IPokemonState;
  dispatch: Dispatch<PokemonAction>;
}

export const PokemonContext = createContext({} as IContextProps);

export const initialPokemonState: IPokemonState = {
  pokemons: [],
  selectedPokemon: null
};

export const PokemonProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);
  const value = { state, dispatch };

  return (
    <PokemonContext.Provider value={value}>
      {props.children}
    </PokemonContext.Provider>
  );
};
