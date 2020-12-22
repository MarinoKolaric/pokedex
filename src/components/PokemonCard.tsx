import React from "react";
import styled, { css } from "styled-components";
import { theme } from "@style";
import { IPokemonDetails, IType } from "@types";
import placeholderImg from "../images/logo.png";

const PokemonContainer = styled.div<{ inDetails: boolean | undefined }>`
  padding: 24px;
  margin: 8px;
  background: #333;
  color: #fff;
  max-width: 300px;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    !props.inDetails &&
    css`
      &:hover {
        ${theme.boxShadow}
      }
    `}
`;

const DetailsContainer = styled(PokemonContainer)``;

const Name = styled.div`
  text-transform: capitalize;
  width: 100%;
  text-align: center;
  padding: 12px 8px;
  font-size: ${theme.fontSize.lg};
  letter-spacing: 1px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  background: radial-gradient(
    ellipse at center,
    #ffffff 0%,
    #ffffff 33%,
    #aeb0f3 50%,
    transparent 70%
  );
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Type = styled.span`
  color: #fff;
  background: #f729;
  border-radius: 8px;
  margin: 4px;
  padding: 4px 12px;
  cursor: pointer;
`;

const Detail = styled.div`
  color: #8d8d8d;

  & > span {
    padding-left: 5px;
    color:${theme.color.background};
  }
`;

export const PokemonCard = ({
  pokemon,
  withDetails,
  handleOnTypeClick,
}: {
  pokemon: IPokemonDetails;
  withDetails?: boolean;
  handleOnTypeClick?: (x: IType) => void;
}) => {
  return (
    <>

      <PokemonContainer inDetails={withDetails}>
        <ImgWrapper>
          {pokemon.img ? (
            <Img src={pokemon.img} alt={pokemon.name} />
          ) : (
            <Img src={placeholderImg} alt={pokemon.name} />
          )}
        </ImgWrapper>
        <Name>{pokemon.name}</Name>
        <TypesContainer>
          {pokemon.types?.map((type) => {
            return (
              <Type
                key={type.slot}
                onClick={() => handleOnTypeClick && handleOnTypeClick(type)}
              >
                {type.type.name}
              </Type>
            );
          })}
        </TypesContainer>
      </PokemonContainer>
      {withDetails && (
        <DetailsContainer inDetails={withDetails}>
          <Detail>
            order: <span>#{pokemon.order}</span>
          </Detail>
          <Detail>
            height: <span>{pokemon.height}</span>
          </Detail>
          <Detail>
            weight: <span>{pokemon.weight}</span>
          </Detail>
          <Detail>
            base experience: <span>{pokemon.baseExperience}</span>
          </Detail>
        </DetailsContainer>
      )}
    </>
  );
};
