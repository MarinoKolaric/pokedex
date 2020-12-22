import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IPokemonDetails } from "@types";
import { PokemonContext } from "@context";


export const usePokemonsGetByType = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState<Array<IPokemonDetails>>([]);

  const {
    state: { typeFilter },
  } = useContext(PokemonContext);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${typeFilter}`,
    })
      .then((res) => {
        return res.data.pokemon;
      })
      .then((allPokemons) => {
        allPokemons.forEach(
          ({ pokemon: { url }}: {
            slot: number;
            pokemon: {
              name: string;
              url: string;
            };
          }) => {
            axios({
              method: "GET",
              url,
            }).then((res) => {
              const {
                id,
                name,
                order,
                weight,
                sprites: {
                  other: {
                    "official-artwork": { front_default },
                  },
                },
                types,
              } = res.data;

              setLoading(false);

              setPokemons((prevPokemons) => [
                ...prevPokemons,
                {
                  id,
                  name,
                  order,
                  weight,
                  img: front_default,
                  types,
                },
              ]);
            });
          }
        );
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [typeFilter]);

  return { loading, error, pokemons };
};
