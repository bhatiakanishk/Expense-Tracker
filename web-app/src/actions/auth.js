import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//function to call API to sign in
export const signin = (formData, navigate) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        //on successful sign in go to home page
        navigate("/home", { replace: true });
    }
    catch (error) {
        console.log(error);
    }
}

//function to call API to sign up
export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        //notify that email has been successfully sent
        alert('Verification email has been sent. Please verify your email before login.');
        //reload page to get on auth page to login
        window.location.reload();
    }
    catch (error) {
        console.log(error);
    }
}