import React, { useState } from 'react';
import Overlay from './Overlay';
import FormModal from './FormModal';
import useInput from '../hooks/useInput';
import LocalSource from './InputLocal/LocalSource';
import OnlineSource from './InputWeb/OnlineSource';

const options = [
  { value: '.geojson', label: 'GeoJSON(.geojson)' },
  { value: '.kml', label: 'KML (.kml)' },
  { value: '.kmz', label: 'KMZ(.kmz)' },
  { value: '.geotiff, .tif , .tiff', label: 'GeoTiff(.geotiff, .tif, .tiff)' },
  { value: '.dted', label: 'DTED(.dted)' },
  { value: '.nitf', label: 'Nitf(.nitf)' },
  { value: '.shp', label: 'Shapefile (.shp)' },
  { value: '.adrg', label: 'ADRG (.adrg)' },
  { value: '.jp2', label: 'JP2 (.jp2)' },
];

function EditModal({
  isEdit, onCancel, onUpdate, mapId,
}) {
  const [sourceNav, setSourceNav] = useState([
    {
      sourceName: 'Local Source',
      isActive: true,
    },
    {
      sourceName: 'Remote Source',
      isActive: false,
    },
  ]);
  const [fileNameInput, onChangeFileNameInput, setFileNameInput] = useInput();
  const [selectFileTypeValue, onChangeSelectFileTypeValue, setSelectFileTypeInput] = useInput();
  const [fileSource, setFileSource] = useState();
  const [fileSourceFromUrl, onChangeFileSourceFromUrlHandler] = useInput();

  const onClickSourceNavHandler = ({ target }) => {
    setSourceNav((prevState) => prevState.map((source) => {
      if (source.sourceName === target.name) {
        source.isActive = true;
      } else {
        source.isActive = false;
      }
      return source;
    }));
  };

  const onChangeUploadedFile = ({ target }) => {
    setFileSource(target.files);
  };
  const onUpdateHandler = (e, { id, newData }) => {
    onUpdate(e, { id, newData });
    setFileNameInput('');
    setSelectFileTypeInput('');
    setFileSource('');
  };

  return isEdit ? (
    <>
      <Overlay overlayStyle="bg-[rgba(255,255,255,.7)]" />
      <FormModal
        formHeaderText="Edit Map Data"
        formStyle="bg-white"
        onUpdateHandler={onUpdateHandler}
        mapId={mapId}
        fileNameInput={fileNameInput}
        selectFileTypeValue={selectFileTypeValue}
        uploadedFile={fileSource}
        fileSourceFromUrl={fileSourceFromUrl}
      >
        <div className="after:block after:contents-[''] after:w-full after:h-[2px] after:bg-gray">
          <div className="flex w-full justify-between">
            {sourceNav.map((source) => (
              <button
                type="button"
                key={source.sourceName}
                onClick={onClickSourceNavHandler}
                name={source.sourceName}
                className={`${source.isActive && 'after:block after:w-full after:contents-[""] after:h-[2px] after:bg-blue-thin text-blue-thin'} text-xl`}
              >
                {source.sourceName}
              </button>
            ))}
          </div>
        </div>
        {sourceNav[0].isActive ? (
          <>
            <LocalSource
              options={options}
              selectFileTypeValue={selectFileTypeValue}
              onChangeSelectFileTypeValue={onChangeSelectFileTypeValue}
              fileNameInput={fileNameInput}
              onChangeFileNameInput={onChangeFileNameInput}
              onChangeUploadedFile={onChangeUploadedFile}
              uploadedFile={fileSource}
            />
            <div className="flex justify-end mt-6 gap-3">
              <button type="button" className="px-5 py-2 border rounded-lg bg-[#808080] text-white" onClick={onCancel}>Cancel</button>
              <button type="submit" className="px-5 py-2 border rounded-lg bg-[#1A56DB] text-white">Update</button>
            </div>
          </>

        ) : (
          <div className="">
            <OnlineSource
              fileName={fileNameInput}
              onChangeFileName={onChangeFileNameInput}
              fileSource={fileSourceFromUrl}
              onChangeFileSource={onChangeFileSourceFromUrlHandler}
              onChangeSelectFileTypeValue={onChangeSelectFileTypeValue}
              SelectFileTypeOptions={options}
            />
            <div className="flex justify-end mt-6 gap-3">
              <button type="button" className="px-5 py-2 border rounded-lg bg-[#808080] text-white" onClick={onCancel}>Cancel</button>
              <button type="submit" className="px-5 py-2 border rounded-lg bg-[#1A56DB] text-white">Update</button>
            </div>
          </div>
        )}
      </FormModal>
    </>
  ) : null;
}

export default EditModal;
