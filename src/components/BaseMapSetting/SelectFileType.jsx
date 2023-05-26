import React from 'react';

import {
  InputLabel, FormControl, MenuItem, Select,
} from '@mui/material';

function SelectFileType({
  fileTypes = [], selectStyle, value, onChangeValue,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="simple-select-label">File Type</InputLabel>
      <Select
        value={value}
        onChange={onChangeValue}
        labelId="simple-select-label"
        label="File Type"
        className={`rounded-xl ${selectStyle}`}
      >
        {fileTypes.map((fileType) => (
          <MenuItem value={fileType.value} className="text-sm" key={fileType.label}>{fileType.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectFileType;
