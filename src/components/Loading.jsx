import React from 'react';
import Overlay from './Overlay';

const Loading = ({isLoading}) => {
  return isLoading ? (
    <div className='absolute left-1/2 top-1/2'>
    <div className="z-20 flex flex-col justify-center items-center text-blue-thin">
      <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
      </div>
      <span className="font-lg mt-2 block text-xl">
          Uploading
        </span>
    </div>
    <Overlay overlayStyle={"bg-[rgba(0,0,0,0.3)]"}/>
    </div>
  ): null;
};

export default Loading;
