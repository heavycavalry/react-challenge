import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';
import '../../index.css';
import { ArrowForwardIosRounded } from '@mui/icons-material';
import { AddRounded } from '@mui/icons-material';

// COLORS
const disabled = {
  primary: 'rgba(51, 51, 51, 0.25)',
  primaryLight: 'rgba(51, 51, 51, 0.07)',
};
const primary = {
  primary: '#334ACC',
  primaryDark: '#223289',
  secondary: '#E8EAF6',
  tertiary: '#C5CAE9',
};
const success = {
  primary: '#00A980',
  primaryLight: '#DBEBDB',
  secondary: '#66BB6A',
};
const warning = {
  primary: '#FFA726',
  primaryLight: '#FFF5D2',
  secondary: '#B28C09',
};
const error = {
  primary: '#FF5D5D',
  primaryLight: '#FCECE6',
  secondary: '#FDE8E0',
};

function propDependentSize(size) {
  return (props) => (props.text ? 'unset' : size);
}

export const BaseButton = styled(MuiButton)`
  font-weight: 500;
  border: none;
  && {
    padding: '8px 12px';
    max-width: ${propDependentSize('34px')};
    max-height: ${propDependentSize('34px')};
    min-height: ${propDependentSize('34px')};
    min-width: ${propDependentSize('34px')};
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    line-height: 22px;
    box-shadow: none;
    font-style: normal;
    text-transform: unset;
    span {
      margin: ${(props) => (props.text ? true : '0')};
    }
    &:hover,
    &:active {
      box-shadow: none;
    }
    &:disabled {
      color: ${disabled.primary};
      background-color: ${(props) =>
        (props.variant === 'outlined') && (props.color !== 'primary')
          ? 'none'
          : disabled.primaryLight};
      border: ${(props) =>
        (props.variant === 'outlined') && (props.color !== 'primary')
          ? `1px solid ${disabled.primaryLight}`
          : 'none'};
    }

  }
`;
export const PrimaryButton = styled(BaseButton)`
  background-color: ${(props) =>
    props.variant === 'contained' ? primary.primary : primary.secondary};
  color: ${(props) =>
    props.variant === 'contained' ? 'white' : primary.primary};
  &:hover,
  &:active {
    color: ${(props) =>
      props.variant === 'contained' ? primary.secondary : primary.primaryDark};
    border: none;
    background-color: ${(props) =>
      props.variant === 'contained' ? primary.primaryDark : primary.tertiary};
  }
`;
export const SuccessButton = styled(BaseButton)`
  font-weight: 600;
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : `1px solid ${success.secondary}`};
  background-color: ${(props) =>
    props.variant === 'contained' ? success.primaryLight : 'none'};
  color: ${success.primary};
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained' ? success.primary : success.primaryLight};
    color: ${(props) =>
      props.variant === 'contained' ? 'white' : success.primary};
  }
  &:active {
    background-color: ${success.primaryLight};
    color: ${success.primary};
  }
`;
export const WarningButton = styled(BaseButton)`
  font-weight: 600;
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : `1px solid ${warning.primary}`};
  background-color: ${(props) =>
    props.variant === 'contained' ? warning.primaryLight : 'none'};
  color: ${(props) =>
    props.variant === 'contained' ? warning.secondary : warning.primary};
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained' ? warning.primary : warning.primaryLight};
    color: ${(props) =>
      props.variant === 'contained' ? 'white' : warning.primary};
  }
  &:active {
    background-color: ${warning.primaryLight};
    color: ${(props) =>
      props.variant === 'contained' ? warning.secondary : warning.primary};
  }
`;
export const ErrorButton = styled(BaseButton)`
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : `1px solid ${error.primary}`};
  background-color: ${(props) =>
    props.variant === 'contained' ? `${error.primaryLight}` : 'none'};
  color: ${error.primary};
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained'
        ? `${error.primary}`
        : `${error.secondary}`};
    color: ${(props) =>
      props.variant === 'contained' ? 'white' : `${error.primary}`};
  }
  &:active {
    background-color: ${(props) =>
      props.variant === 'contained'
        ? `${error.primaryLight}`
        : `${error.secondary}`};
    color: ${error.primary};
  }
`;

export const IconAdd = styled(AddRounded)`
  font-size: 1.04rem !important;
`;

export const IconArrow = styled(ArrowForwardIosRounded)`
  font-size: 0.62rem !important;
`;
