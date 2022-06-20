import { SET_USER } from './actionType';

//setting the user
export const setUser = (payload) => ({
    type: SET_USER,
    user: payload
});

