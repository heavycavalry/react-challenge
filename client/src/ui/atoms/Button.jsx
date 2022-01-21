import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import styled from 'styled-components';
import PropTypes from 'prop-types';

Button.propTypes = {
  color: PropTypes.oneOf(['error', 'success', 'warning', 'primary']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export function Button({ children, ...props }) {
  if (props.color === 'success') {
    return <SuccessButton {...props}>{children}</SuccessButton>;
  }
  if (props.color === 'warning') {
    return <WarningButton {...props}>{children}</WarningButton>;
  }
  if (props.color === 'error') {
    return <ErrorButton {...props}>{children}</ErrorButton>;
  }
  if (props.color === 'primary') {
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
  return <MuiButton {...props}>{children}</MuiButton>;
}

export const BaseButton = styled(MuiButton)`
  && {
    padding: 8px 12px;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
    text-transform: capitalize;
    line-height: 22px;
    box-shadow: none;
    font-style: normal;
    &:hover,
    &:active {
      box-shadow: none;
    }
    &:disabled {
      color: 'rgba(51, 51, 51, 0.25)';
      background-color: ${(props) =>
        (props.variant === 'outlined') & (props.color !== 'primary')
          ? 'none'
          : 'rgba(51, 51, 51, 0.07)'};
      border: ${(props) =>
        (props.variant === 'outlined') & (props.color !== 'primary')
          ? '1px solid rgba(51, 51, 51, 0.07)'
          : 'none'};
    }
  }
`;
export const ErrorButton = styled(BaseButton)`
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : '1px solid #FF5D5D'};
  background-color: ${(props) =>
    props.variant === 'contained' ? '#FCECE6' : 'none'};
  color: #ff5d5d;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained' ? '#FF5D5D' : '#FDE8E0'};
    color: ${(props) => (props.variant === 'contained' ? 'white' : '#FF5D5D')};
  }
  &:active {
    background-color: #fcece6;
    color: #ff5d5d;
  }
`;
export const WarningButton = styled(BaseButton)`
  font-weight: 600;
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : '1px solid #FFA726'};
  background-color: ${(props) =>
    props.variant === 'contained' ? '#FFF5D2' : 'none'};
  color: ${(props) => (props.variant === 'contained' ? '#b28c09' : '#FFA726')};
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained' ? '#FFA726' : '#FFF5D2'};
    color: ${(props) => (props.variant === 'contained' ? 'white' : '#FFA726')};
  }
  &:active {
    background-color: ${(props) =>
      props.variant === 'contained' ? '#FFF5D2' : '#FFF5D2'};
    color: ${(props) =>
      props.variant === 'contained' ? '#B28C09' : '#FFA726'};
  }
`;
export const PrimaryButton = styled(BaseButton)`
  border: none;
  background-color: ${(props) =>
    props.variant === 'contained' ? '#334ACC' : '#E8EAF6'};
  &:hover,
  &:active {
    color: ${(props) => (props.variant === 'contained' ? 'white' : '#223289')};
    border: none;
    background-color: ${(props) =>
      props.variant === 'contained' ? '#223289' : '#C5CAE9'};
  }
`;
export const SuccessButton = styled(BaseButton)`
  font-weight: 600;
  border: ${(props) =>
    props.variant === 'contained' ? 'none' : '1px solid #66BB6A'};
  background-color: ${(props) =>
    props.variant === 'contained' ? '#DBEBDB' : 'none'};
  color: #00a980;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'contained' ? '#00A980' : '#DBEBDB'};
    color: ${(props) => (props.variant === 'contained' ? 'white' : '#00A980')};
  }
  &:active {
    background-color: #dbebdb;
    color: '#00A980';
  }
`;
