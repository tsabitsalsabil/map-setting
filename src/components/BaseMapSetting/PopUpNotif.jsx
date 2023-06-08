import React from 'react';

function PopUpNotif({
  icon, message, isShow, onClose,
}) {
  return isShow ? (
    <article className="absolute top-0" data-testid="popupnotification">
      <span>
        <i>{icon}</i>
      </span>
      <h1>{message}</h1>
      <button type="button" onClick={onClose}>x</button>
    </article>
  ) : null;
}

export default PopUpNotif;
