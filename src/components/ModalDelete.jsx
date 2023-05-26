import React from 'react';

function ModalDelete({
  messageConfirmation = 'Are you sure?',
  messageDescription = 'You are about to delete ..',
  onDelete,
  onCancel,
  isShow = false,
  id,
}) {
  return isShow ? (
    <>
      <section className="modal absolute top-1/2 right-1/2 w-3/12 bg-white translate-x-1/2 -translate-y-1/2 border rounded-lg py-4 flex flex-col gap-2 z-20 text-center">
        <h1 className="text-[#E24C4B]">{messageConfirmation}</h1>
        <p>{messageDescription}</p>
        <div className="action flex justify-center items-center gap-5">
          <button className="text-lg py-1 px-6 rounded-lg bg-[#808080] text-white" type="button" onClick={onCancel}>Cancel</button>
          <button className="text-lg py-1 px-6 rounded-lg bg-[#E24C4B] text-white" type="button" onClick={() => onDelete(id)}>Delete</button>
        </div>
      </section>
      <section className="overlay fixed top-0 left-0 right-0 bottom-0 bg-[rgba(255,255,255,.7)] z-10" />
    </>
  ) : null;
}

export default ModalDelete;
