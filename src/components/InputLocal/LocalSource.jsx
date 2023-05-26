import React from 'react';
import FormInput from '../FormInput';
import SelectFileType from '../BaseMapSetting/SelectFileType';
import { getFileExtension } from '../../utils/getMapExtension';

function LocalSource({
  options,
  selectFileTypeValue,
  onChangeSelectFileTypeValue,
  fileNameInput,
  onChangeFileNameInput,
  onChangeUploadedFile,
  uploadedFile,
}) {
  return (
    <div>
      <FormInput inputPlaceholder="File Name" inputType="text" inputStyle="mt-8 my-7" value={fileNameInput} onChange={onChangeFileNameInput} />
      <SelectFileType
        fileTypes={options}
        value={selectFileTypeValue}
        onChangeValue={onChangeSelectFileTypeValue}
      />
      <div className="w-full mt-6 rounded-lg flex justify-start">
        <label className="bg-black w-[55%] text-white px-2 py-2 rounded-tl-lg rounded-bl-lg text-md cursor-pointer">
          Choose File
          <input type="file" hidden onChange={onChangeUploadedFile} />
        </label>
        <FormInput isDisabled inputStyle="rounded-tl-none rounded-bl-none" value={uploadedFile && `${fileNameInput}.${getFileExtension(uploadedFile[0].name)}`} />
      </div>
    </div>
  );
}

export default LocalSource;
