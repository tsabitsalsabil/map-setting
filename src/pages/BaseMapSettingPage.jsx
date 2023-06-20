import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import SideBarMapSetting from '../components/BaseMapSetting/SidebarMapSetting';
import BaseMapContent from '../components/BaseMapSetting/BaseMapContent';
import MapListContent from '../components/BaseMapSetting/MapListContent';
import useInput from '../hooks/useInput';
import { searchMapListActionCreator, modalAddSuccessToggleActionCreator, toggleErrorActionCreator } from '../states';
import AddMapContent from '../components/BaseMapSetting/AddMapContent';
import LocalSource from '../components/InputLocal/LocalSource';
import OnlineSource from '../components/InputWeb/OnlineSource';
import ModalSuccess from '../components/ModalSuccess';
import { asyncAddMapListActionCreator, asyncAddMapListFromOnlineSourceActionCreator, asyncSearchMap } from '../states/MapList/actionCreator';
import PopUpNotif from '../components/BaseMapSetting/PopUpNotif';
import Loading from '../components/Loading';
import Overlay from '../components/Overlay';

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
  { value: 'GeoJSON', label: 'GeoJSON(.geojson)' },
  { value: 'KML', label: 'KML (.kml)' },
  { value: 'KMZ', label: 'KMZ (.kmz)' },
  { value: 'CSV', label: '(.csv)' },
  { value: 'CZML', label: '(.czml)' },
  { value: 'GeoTIFF', label: 'GeoTiff(.geotiff, .tif, .tiff)' },
  { value: 'DTED', label: 'DTED(.dted)' },
  { value: 'NITF', label: 'Nitf(.nitf)' },
  { value: 'ESRI Shapefile', label: 'Shapefile ' },
];

const onlineSourceOptions = [
  {
    value: 'WMS',
    label: 'Web Map Service (WMS)',
  },
  {
    value: 'WFS',
    label: 'Web Feature Service (WFS)',
  },
];

function BaseMapSettingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchKeywordValue, , setSearchKeywordValue] = useInput('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [options, setOptions] = useState(subNavOptions);
  const [fileName, onChangeFileName, setFileName] = useInput();
  const [selectTypeValue, onChangeSelectTypeValue, setSelectTypeValue] = useInput();
  const [uploadedFile, setUploadedFile] = useState();
  const [fileSource, onChangeFileSourceHandler, setFileSource] = useInput();
  const {
    modals: { isAddSuccess }, requestStatus, listMap, loader: { isLoading, message },
  } = useSelector((states) => states);
  console.log(listMap);
  const onChangeUploadedFileHandler = ({ target }) => {
    setUploadedFile(target.files);
  };

  const onChangeSearchKeyword = ({ target }) => {
    setSearchKeywordValue(target.value);
    // if (searchCategory !== '') {
    //   dispatch(asyncSearchMap(searchCategory, searchKeywordValue));
    // }
  };

  const onChangeCategory = ({ target }) => {
    setSearchCategory(target.value);
  };
  console.log(searchKeywordValue);

  const clearAllDataInput = () => {
    setFileName('');
    setSelectTypeValue('');
    setUploadedFile('');
    setFileSource('');
  };
  const closePopupNotification = () => {
    dispatch(toggleErrorActionCreator(false));
  };

  const onAddHandler = () => {
    // dummy data
    // dispatch(addMapListActionCreator({
    //   map: fileName,
    //   source: fileSource || (`${fileName}.${getFileExtension(uploadedFile[0].name)}`),
    //   no: +new Date(),
    // }));
    console.log({
      fileName, uploadedFile, selectTypeValue, fileSource,
    });
    dispatch(asyncAddMapListActionCreator({
      map: fileName, uploadedFile, fileType: selectTypeValue, source: fileSource,
    }));
    clearAllDataInput();
  };

  const onClose = () => {
    dispatch(modalAddSuccessToggleActionCreator(false));
    navigate('/map-setting/');
  };

  const addHandlerFromOnlineSource = () => {
    dispatch(asyncAddMapListFromOnlineSourceActionCreator({
      name: fileName, title: fileName, type: selectTypeValue, url: fileSource,
    }));
    clearAllDataInput();
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
                searchCategory={searchCategory}
                onChangeCategory={onChangeCategory}
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
                onAddHandler={options[0].isActive ? onAddHandler : addHandlerFromOnlineSource}
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
                      SelectFileTypeOptions={onlineSourceOptions}
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
      <PopUpNotif
        icon={<IoMdCloseCircleOutline className="rounded-full text-2xl" />}
        message={requestStatus.message}
        onClose={closePopupNotification}
        isShow={requestStatus.error}
      />
      <Loading isLoading={isLoading} message={message} />

    </article>
  );
}

export default BaseMapSettingPage;
