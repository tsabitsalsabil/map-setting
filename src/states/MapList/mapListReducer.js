import ACTION_TYPE from './mapListActionType';

const initialState = [];
const mapListReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPE.deleteMapListType:
      return state.filter((map) => map.id !== action.payload.id);
    // case ACTION_TYPE.searchMapListType:
    //   if (action.payload.category === 'all') {
    //     return state.filter(
    //       (mapItem) => mapItem.title.toLowerCase().includes(action.payload.query.toLowerCase()) || mapItem.source.toLowerCase().includes(action.payload.query.toLowerCase()),
    //     );
    //   }
    //   if (action.payload.category === 'title') {
    //     return state.filter((mapItem) => mapItem.title.toLowerCase().includes(action.payload.query.toLowerCase()));
    //   }
    //   if (action.payload.category === 'source') {
    //     return state.filter((mapItem) => mapItem.source.toLowerCase().includes(action.payload.query.toLowerCase()));
    //   }
    case ACTION_TYPE.getMapListType:
      return [...action.payload.mapList];
    case ACTION_TYPE.putMapListType:
      const newMapList = [];
      state.map((map) => {
        if (map.id === action.payload.id) {
          console.log({ paylod: action.payload });
          map.id = action.payload.id;
          map.name = action.payload.newData.name;
          map.title = action.payload.newData.title;
          map.type = action.payload.newData.type;
        }
        newMapList.push(map);
      });
      return newMapList;
    case ACTION_TYPE.addMapListType:
      return [
        ...state,
        {
          ...action.payload,
        },
      ];
    default: return state;
  }
};

export default mapListReducer;
