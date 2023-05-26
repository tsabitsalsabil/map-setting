import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ModalAfterAction from './ModalAfterAction';

function ModalFailed({ isShow, messageDescription, buttonDescription }) {
  return (
    <ModalAfterAction
      buttonDescription={buttonDescription}
      icon={<IoCloseOutline />}
      isShow={isShow}
      messageDescription={messageDescription}
      iconColorInHex="E24C4B"
    />
  );
}

export default ModalFailed;
