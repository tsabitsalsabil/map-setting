import React from 'react';
import Overlay from './Overlay';

function ModalAfterAction({
  isShow, icon, messageDescription, buttonDescription, iconColorInHex, onCloseModal,
}) {
  return isShow ? (
    <>
      <Overlay overlayStyle="bg-[rgba(255,255,255,.7)] z-10" />
      <article
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-7 border rounded-lg flex flex-col items-center w-2/12 z-20"
      >
        <section className="flex items-center gap-2">
          <span className="text-white rounded-full text-xl" style={{ backgroundColor: `#${iconColorInHex}` }}>{icon}</span>
          <span className="font-bold text-xl">{messageDescription}</span>
        </section>
        <button
          type="button"
          className="border-2 text-center w-3/4 py-1 mt-5 rounded-lg text-xl hover:bg-[#f2f2f2] transition-colors"
          style={{ borderColor: `#${iconColorInHex}`, color: `#${iconColorInHex}` }}
          onClick={onCloseModal}
        >
          {buttonDescription}
        </button>
        <section />
      </article>
    </>
  ) : null;
}

export default ModalAfterAction;
