//@flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';

type Props = {
  children: Node,
  header: ?Node,
  footer: ?Node
};

export const MainTemplate = ({ children, header, footer }: Props) => (
  <MainContainer>
    {header && <Header>{header}</Header>}
    {children}
    {footer && <Footer>{footer}</Footer>}
  </MainContainer>
);

const MainContainer = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    '.'
    'footer';
`;

const Header = styled.div`
  grid-area: header;
`;

const Footer = styled.div`
  grid-area: footer;
`;