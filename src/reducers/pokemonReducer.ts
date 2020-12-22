import { IPokemonState, PokemonAction } from "@types";

export const pokemonReducer = (
  state: IPokemonState,
  action: PokemonAction
): IPokemonState => {
  switch (action.type) {

    case "SET_TYPE_FILTER":
      return { ...state, typeFilter: action.payload };
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SEARCHED_POKEMON":
      return { ...state, searchedPokemon: action.payload };

    default:
      return state;
  }
};
