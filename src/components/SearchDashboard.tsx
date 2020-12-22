import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { PokemonContext } from "@context";
import { theme } from "@style";
import { CloseButton } from "@components";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  margin: 8px;
  background: ${theme.color.gray};
  color: #fff;
  width: 100%;
  border-radius: 4px;
  height: 84px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background: ${theme.color.background};
  border-radius: 4px;
  margin: 0 8px;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: ${theme.fontSize.xxs};
`;

const Input = styled.input`
  height: 40px;
  padding: 4px 12px;
  margin-left: 4px;
  border-radius: 4px;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 100%;
  font-size: ${theme.fontSize.xxs};
  color: ${theme.color.alertColor};
  margin-left: 32px;
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: 100%;
  font-size: ${theme.fontSize.xxs};
  color: ${theme.color.loadingColor};
  margin-left: 32px;
`;

const NumOfPagesContainer = styled.div`
  margin-left: auto;
`;

export const SearchDashboard = () => {
  const {
    state: { limit },
    dispatch,
  } = useContext(PokemonContext);

  const [selectedLimit, setSelectedLimit] = useState(limit);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const limitOptions = [10, 20, 50, 100];

  function handleLimit(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault();
    setSelectedLimit(+e.target.value);

    dispatch({
      type: "SET_LIMIT",
      payload: +e.target.value,
    });
    dispatch({
      type: "SET_OFFSET",
      payload: 0,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchValue.length <= 0) {
      dispatch({
        type: "SEARCHED_POKEMON",
        payload: null,
      });
      return;
    }

    setLoading(true);

    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}/`,
    })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
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
        } = res;

        dispatch({
          type: "SEARCHED_POKEMON",
          payload: {
            id,
            name,
            order,
            weight,
            img: front_default,
            types,
          },
        });

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(false);
    setSearchValue(e.target.value);
  }

  function resetFilteredPokemon() {
    setSearchValue("");
    setError(false);
    dispatch({
      type: "SEARCHED_POKEMON",
      payload: null,
    });
  }

  return (
    <Container>
      <div>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input type="text" value={searchValue} onChange={handleChange} />
          </Label>
          <Input type="submit" value="Search"></Input>
          {loading && <LoadingMessage>Searching...</LoadingMessage>}
          {error && <ErrorMessage>pokemon nije pronađen!</ErrorMessage>}
        </Form>
      </div>
      {searchValue && (
        <ButtonWrapper>
          <CloseButton onClick={() => resetFilteredPokemon()} />
        </ButtonWrapper>
      )}

      <NumOfPagesContainer>
        Broj prikaza:
        <select value={selectedLimit} onChange={handleLimit}>
          ;
          {limitOptions.map((v, i) => {
            return (
              <option key={i} value={v}>
                {v}
              </option>
            );
          })}
          <option defaultValue="" value={1000}>
            Sve
          </option>
        </select>
      </NumOfPagesContainer>
    </Container>
  );
};
