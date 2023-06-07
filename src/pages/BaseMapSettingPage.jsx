import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SideBarMapSetting from '../components/BaseMapSetting/SidebarMapSetting';
import BaseMapContent from '../components/BaseMapSetting/BaseMapContent';
import MapListContent from '../components/BaseMapSetting/MapListContent';
import useInput from '../hooks/useInput';
import { searchMapListActionCreator, modalAddSuccessToggleActionCreator } from '../states';
import AddMapContent from '../components/BaseMapSetting/AddMapContent';
import LocalSource from '../components/InputLocal/LocalSource';
import OnlineSource from '../components/InputWeb/OnlineSource';
import { getFileExtension } from '../utils/getMapExtension';
import ModalSuccess from '../components/ModalSuccess';
import { asyncAddMapListActionCreator } from '../states/MapList/actionCreator';

const subNavOptions = [
  {
    name: 'Local Source',
    isActive: true,
  },
  {
    name: 'Remote Sources',
    isActive: false,
  },
];
const selectTypeOptions = [
  { value: '.geojson', label: 'GeoJSON(.geojson)' },
  { value: '.kml', label: 'KML (.kml)' },
  { value: '.kmz', label: 'KMZ(.kmz)' },
  { value: 'GeoTIFF', label: 'GeoTiff(.geotiff, .tif, .tiff)' },
  { value: '.dted', label: 'DTED(.dted)' },
  { value: '.nitf', label: 'Nitf(.nitf)' },
  { value: '.shp', label: 'Shapefile (.shp)' },
  { value: '.adrg', label: 'ADRG (.adrg)' },
  { value: '.jp2', label: 'JP2 (.jp2)' },
];

function BaseMapSettingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeywordValue, , setSearchKeywordValue] = useInput();
  const [options, setOptions] = useState(subNavOptions);
  const [fileName, onChangeFileName, setFileName] = useInput();
  const [selectTypeValue, onChangeSelectTypeValue, setSelectTypeValue] = useInput();
  const [uploadedFile, setUploadedFile] = useState();
  const [fileSource, onChangeFileSourceHandler, setFileSource] = useInput();
  const { modals: { isAddSuccess } } = useSelector((states) => states);

  const onChangeUploadedFileHandler = ({ target }) => {
    setUploadedFile(target.files);
  };

  const onChangeSearchKeyword = ({ target }) => {
    setSearchKeywordValue(target.value);
    dispatch(searchMapListActionCreator(target.value));
  };

  const clearAllDataInput = () => {
    setFileName('');
    setSelectTypeValue('');
    setUploadedFile('');
    setFileSource('');
  };

  const onAddHandler = () => {
    // dummy data
    // dispatch(addMapListActionCreator({
    //   map: fileName,
    //   source: fileSource || (`${fileName}.${getFileExtension(uploadedFile[0].name)}`),
    //   no: +new Date(),
    // }));
    dispatch(asyncAddMapListActionCreator({
      map: fileName, uploadedFile, fileType: selectTypeValue, source: fileSource,
    }));
    clearAllDataInput();
  };
  const onClose = () => {
    dispatch(modalAddSuccessToggleActionCreator(false));
    navigate('/map-setting/');
  };

  return (
    <article className="flex bg-[#F5F5F5]">
      <SideBarMapSetting />
      <Routes>
        <Route
          path="/"
          element={(
            <BaseMapContent onClose={onClose} isShow={isAddSuccess}>
              <MapListContent
                searchKeywordValue={searchKeywordValue}
                onSearchKeywordValueChange={onChangeSearchKeyword}
              />
            </BaseMapContent>
)}
        />
        <Route
          path="/add-map"
          element={(
            <BaseMapContent>
              <AddMapContent
                title={options[0].isActive ? options[0].name : options[1].name}
                options={options}
                onAddHandler={onAddHandler}
                subNavOptions={options}
                onCLose={onClose}
                sourceComponent={options[0].isActive
                  ? (
                    <LocalSource
                      fileNameInput={fileName}
                      onChangeFileNameInput={onChangeFileName}
                      options={selectTypeOptions}
                      selectFileTypeValue={selectTypeValue}
                      onChangeSelectFileTypeValue={onChangeSelectTypeValue}
                      uploadedFile={uploadedFile}
                      onChangeUploadedFile={onChangeUploadedFileHandler}
                    />
                  ) : (
                    <OnlineSource
                      fileName={fileName}
                      onChangeFileName={onChangeFileName}
                      fileSource={fileSource}
                      onChangeFileSource={onChangeFileSourceHandler}
                      SelectFileTypeOptions={selectTypeOptions}
                      selectFileTypeValue={selectTypeValue}
                      onChangeSelectTypeValue={onChangeSelectTypeValue}
                    />
                  )}
                setOptions={setOptions}
              />
            </BaseMapContent>
            )}
        />
      </Routes>
      <ModalSuccess buttonDescription="OK" messageDescription="Upload Success!" isShow={isAddSuccess} onClose={onClose} />
    </article>
  );
}

export default BaseMapSettingPage;
