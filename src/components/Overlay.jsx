import React from 'react';

function Overlay({ overlayStyle }) {
  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 ${overlayStyle}`} />
  );
}

export default Overlay;
