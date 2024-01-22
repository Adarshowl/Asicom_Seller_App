export const USER_DATA = 'USER_DATA';
export const USER_TOKEN = 'USER_TOKEN';
export const CALCULATION = 'CALCULATION';
export const SET_APP_COLOR = 'SET_APP_COLOR';
export const SET_DEFAULT_IMAGE = 'SET_DEFAULT_IMAGE';
export const SET_APP_LOGO = 'SET_APP_LOGO';
export const SET_APP_CURRENCY = 'SET_APP_CURRENCY'

export const fetchUserData = data => ({
  type: USER_DATA,
  payload: data,
});
export const fetchUserToken = data => ({
  type: USER_TOKEN,
  payload: data,
});
export const updatecalculation = data => ({
  type: CALCULATION,
  payload: data,
});

export const setAppColor = color => ({
  type: SET_APP_COLOR,
  payload: color,
});

export const setDefaultImage = (image) => ({
  type: SET_DEFAULT_IMAGE,
  payload: image,
});
export const setAppLogo = (image) => ({
  type: SET_APP_LOGO,
  payload: image,
});

export const setAppCurrency = (data) => ({
  type: SET_APP_CURRENCY,
  payload: data,
});