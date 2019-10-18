import React from 'react';
import { useStore } from 'effector-react';

import { ModalWindow, Toggle } from 'ui';
import { $session, optionsChange } from 'features/common';
import { accountAPI } from 'api/account';

interface ModalSettingsProps {
  isOpen: boolean;
  closing: () => void;
}

export const ModalSettings = ({ isOpen, closing }: ModalSettingsProps) => {
  const session = useStore($session);

  const elements = [
    { id: 'linkTransitions', text: 'Tracking the number of clicks on links' }
  ];

  return isOpen ? (
    <ModalWindow closing={closing}>
      {elements.map(({ id, text }) => (
        <Toggle
          key={id}
          id={id}
          switching={() => clickSettings(id, session[id])}
          checked={session[id] ? true : false}
        >
          {text}
        </Toggle>
      ))}
    </ModalWindow>
  ) : null;
};

const clickSettings = (id: string, value: boolean) => {
  const field = { [id]: !value };

  optionsChange(field);

  accountAPI
    .changeOptionsCreatedLink(field)
    .catch(() => optionsChange({ [id]: value }));
};
