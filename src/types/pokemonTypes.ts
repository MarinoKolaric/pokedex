export interface IPokemon {
  name: string;
  url: string;
}

export interface IType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonDetails {
  id: number;
  name: string;
  order: number;
  img: string;
  weight?: number;
  types?: Array<IType>;
  baseExperience?: number;
  height?: number;
}

export interface IPokemonState {
  typeFilter: string;
  limit: number;
  offset: number;
  searchedPokemon: IPokemonDetails | null;
}

export type PokemonAction =
  | { type: "SET_TYPE_FILTER"; payload: IPokemonState["typeFilter"] }
  | { type: "SEARCHED_POKEMON"; payload: IPokemonState["searchedPokemon"] }
  | { type: "SET_OFFSET"; payload: IPokemonState["offset"] }
  | { type: "SET_LIMIT"; payload: IPokemonState["limit"] };
