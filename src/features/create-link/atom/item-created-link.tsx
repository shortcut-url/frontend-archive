import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { ButtonPrimary, Icon } from 'ui';
import { Row } from 'lib/styled-components';

interface ItemCreatedLinkProps {
  url: string;
}

export const ItemCreatedLink: React.FC<ItemCreatedLinkProps> = ({ url }) => {
  const [isCopy, setIsCopy] = useState(false);
  const linkRef = useRef(null);

  const onClick = () => {
    linkRef.current.select();
    document.execCommand('copy');

    setIsCopy(true);

    setTimeout(() => setIsCopy(false), 1500);
  };

  return (
    <Row
      tagName={ButtonPrimary}
      key={url}
      onClick={onClick}
      justify="center"
      align="center"
      gap="0.8rem"
    >
      <h5>{url}</h5>

      <Icon name={isCopy ? 'check-circle' : 'copy'} />

      <InputLink ref={linkRef} value={url} readOnly />
    </Row>
  );
};

const InputLink = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  user-select: none;
`;
