import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';
import {
  SuccessButton,
  WarningButton,
  ErrorButton,
  PrimaryButton,
} from './button.styled';

Button.propTypes = {
  color: PropTypes.oneOf(['error', 'success', 'warning', 'primary']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export function Button({ children, ...props }) {
  if (props.color === 'success') {
    return (
      <SuccessButton text={children} {...props}>
        {children}
      </SuccessButton>
    );
  }
  if (props.color === 'warning') {
    return (
      <WarningButton text={children} {...props}>
        {children}
      </WarningButton>
    );
  }
  if (props.color === 'error') {
    return (
      <ErrorButton text={children} {...props}>
        {children}
      </ErrorButton>
    );
  }
  if (props.color === 'primary') {
    return (
      <PrimaryButton text={children} {...props}>
        {children}
      </PrimaryButton>
    );
  }
  return (
    <MuiButton text={children} {...props}>
      {children}
    </MuiButton>
  );
}
