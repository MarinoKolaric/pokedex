export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonState {
  pokemons: Array<IPokemon>;
  selectedPokemon: IPokemon | null;
}

export type PokemonAction =
  | { type: "SET_POKEMON"; payload: IPokemon }
  | { type: "SET_POKEMONS"; payload: IPokemonState["pokemons"] }
