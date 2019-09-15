import React from 'react';
import styled from 'styled-components';

import { Toggle } from '../atom';
import { Row } from 'lib/styled-components';

export const ToggleWithText = ({ text, id, toggle, defaultChecked }) => {
  return (
    <Row gap="0.8rem" align="center" justify="space-between">
      <Label htmlFor={id}>{text}</Label>
      <Toggle toggle={toggle} id={id} defaultChecked={defaultChecked} />
    </Row>
  );
};

const Label = styled.label`
  cursor: pointer;
`;
