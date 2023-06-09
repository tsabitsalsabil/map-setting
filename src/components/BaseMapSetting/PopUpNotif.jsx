import React from 'react';
import { IoClose } from 'react-icons/io5';

function PopUpNotif({
  icon, message, isShow, onClose,
}) {
  return isShow ? (
    <article className={'absolute left-1/2 -translate-x-1/2 bg-white shadow-xl flex justify-center items-center gap-2 rounded-lg p-2 transition-all translate-y-5"'}>
      <span className="text-red-500">
        <i>{icon}</i>
      </span>
      <h1 className="font-bold">{message}</h1>
      <button type="button" onClick={onClose} className="text-xl"><IoClose /></button>
    </article>
  ) : null;
}

export default PopUpNotif;
