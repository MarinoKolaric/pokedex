import { useState, useEffect } from "react";
import axios from "axios";
import { IPokemonDetails } from "@types";

export const usePokemonGet = (pokemonId?: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState<IPokemonDetails>();

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`,
    })
      .then((res) => {
        const {
          id,
          name,
          order,
          weight,
          height,
          base_experience,
          sprites: {
            other: {
              "official-artwork": { front_default },
            },
          },
          types,
        } = res.data;

        setPokemon({
          id,
          name,
          order,
          weight,
          height,
          baseExperience: base_experience,
          img: front_default,
          types,
        });
        setLoading(false);
      })

      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [pokemonId]);

  return { loading, error, pokemon };
};
