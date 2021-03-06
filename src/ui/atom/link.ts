import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { mixins } from 'lib/styled-components';

export const cssLink = css`
  padding: 1rem;
  text-decoration: none;
  transition: 0.15s;
  color: inherit;
  font-size: inherit;
  outline: none;

  &:hover,
  &:focus {
    color: var(--primary-hover);
  }
`;

export const Link = styled(RouterLink)`
  ${mixins}
  ${cssLink}
`;
