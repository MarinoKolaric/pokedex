import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonContext } from "@context";
import { IPokemon, IPokemonDetails } from "@types";

export const usePokemonsGet = ({
  limit = 10,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [pokedex, setPokedex] = useState<Array<IPokemonDetails>>([]);

  const {
    state: {  offset: contextOffset },

  } = useContext(PokemonContext);

  useEffect(() => {
    setPokedex([]);
  }, [limit]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&&offset=${contextOffset}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setHasMore(res.data.results.length > 0);
        return res.data.results;
      })
      .then((allPokemons) => {
        allPokemons.forEach((pokemon: IPokemon) => {
          axios({
            method: "GET",
            url: pokemon.url,
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

            setPokedex((prevPokedex) => [
              ...prevPokedex,
              {
                id,
                name,
                order,
                weight,
                img: front_default,
                types,
              },
            ]);

            setHasMore(allPokemons.length > 0);
            setLoading(false);
          });
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });


    return () => cancel();
  }, [limit, offset]);

  return {
    loading,
    error,
    hasMore,
    pokedex: pokedex.sort((a, b) => a.id - b.id),
  };
};
