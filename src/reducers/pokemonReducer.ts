import { IPokemonState, PokemonAction } from "@types";

export const pokemonReducer = (
  state: IPokemonState,
  action: PokemonAction
): IPokemonState => {
  switch (action.type) {
    case "SET_POKEMON":
      return { ...state, selectedPokemon: action.payload };
    case "SET_POKEMONS":
      return { ...state, pokemons: action.payload };

    default:
      return state;
  }
};
