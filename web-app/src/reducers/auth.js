import { AUTH, LOGOUT} from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      //saving user profile in local storage
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data};
    case LOGOUT:
      //clear out the localstorage
      localStorage.clear();

      return { ...state, authData: null};
    default:
      return state;
  }
};

export default authReducer;