import React from 'react';
import styled, { css } from 'styled-components';

import { Col } from 'lib/styled-components';

export const Input = ({ label, errorLabel, error, disabled, ...props }) => (
  <Col>
    {label && <InputLabel>{label}</InputLabel>}
    <InputNative error={Boolean(error)} disabled={disabled} {...props} />
    {errorLabel && <InputError>{error}</InputError>}
  </Col>
);

const InputNative = styled.input`
  position: relative;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  transition: 0.2s;
  border: 2px solid;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.palette.decoration.borders};

  ${({ theme }) => theme.embed.card}

  ${({ error }) =>
    error &&
    css`
      border-color: red;
    `}

  &:disabled {
    background-color: ${({ theme }) => theme.palette.decoration.borders};
  }

  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.initial.background};
  }
`;

const InputLabel = styled.label`
  margin-bottom: 0.8rem;
  text-align: left;
`;

const InputError = styled(InputLabel)`
  margin-top: 0.5rem;
  color: red;
  font-size: 0.8rem;
  height: 0.8rem;
`;