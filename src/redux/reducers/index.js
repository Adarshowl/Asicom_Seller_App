// IMPORT ALL CONSTANT STRINGS DEFINED IN action file == ../actions/Camp.js
import { SET_APP_CURRENCY, USER_DATA, USER_TOKEN } from '../actions/index';
import { CALCULATION } from '../actions/index'
import { SET_APP_COLOR } from '../actions/index';
import { SET_DEFAULT_IMAGE } from '../actions/index';
import { SET_APP_LOGO } from '../actions/index';

const initialState = {
  userData: {},
  userToken: "",
  appPrimaryColor: null,

  defaultImage: '',
  appLogo: '',
  appcurrency :'',
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };

    case SET_APP_COLOR:
      return {
        ...state,
        appPrimaryColor: action.payload,
      };
    case SET_DEFAULT_IMAGE:
      return {
        ...state,
        defaultImage: action.payload,
      };

    case SET_APP_LOGO:
      return {
        ...state,
        appLogo: action.payload,
      };

      case SET_APP_CURRENCY:
        return {
          ...state,
          appcurrency: action.payload,
        };
    default:
      return state;
  }
};
export default Reducer;
