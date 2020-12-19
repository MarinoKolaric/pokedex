import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { PokemonContext } from "@context";

export const usePokemonsGet = ({
  limit = 20,
  offset = 0,
}: {
  limit?: number;
  offset?: number;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const {
    state: { pokemons },
    dispatch,
  } = useContext(PokemonContext);


  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: any;
    axios({
      method: "GET",
      url: "https://pokeapi.co/api/v2/pokemon/",
      params: { limit: limit, offset: offset },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        dispatch({
          type: "SET_POKEMONS",
          payload: [...pokemons, ...res.data.results],
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;

        setError(true);
      });
    return () => cancel();
  }, [limit, offset]);

  return { loading, error, hasMore };
};
