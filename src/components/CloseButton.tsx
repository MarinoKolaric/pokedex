import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { theme } from "@style";


const Close = styled.button<Props>`
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 40px;
  height: 40px;
  font-size: 24px;
  position: absolute;
  top: 0;
  right: 0;
  color: ${theme.color.gray};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;



  &:hover {
    color: ${theme.color.grayDarker};
  }

`;

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export const CloseButton = ({ disabled = false, onClick }: Props) => {
  return (
    <Close disabled={disabled} onClick={onClick}>
      <MdClose />
    </Close>
  );
};
