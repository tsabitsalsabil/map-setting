/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import FormInput from '../FormInput';
import SelectFileType from '../BaseMapSetting/SelectFileType';

function OnlineSource({
  fileName,
  onChangeFileName,
  fileSource,
  onChangeFileSource,
  onChangeSelectTypeValue,
  SelectFileTypeOptions,
  selectFileTypeValue,
}) {
  return (
    <div className="flex gap-5 flex-col mt-7">
      <FormInput inputPlaceholder="File Name" value={fileName} inputType="text" onChange={onChangeFileName} />
      <SelectFileType
        onChangeValue={onChangeSelectTypeValue}
        fileTypes={SelectFileTypeOptions}
        value={selectFileTypeValue}
      />
      <FormInput inputPlaceholder="Drop Link Here" inputType="text" value={fileSource} onChange={onChangeFileSource} />
    </div>
  );
}

export default OnlineSource;
