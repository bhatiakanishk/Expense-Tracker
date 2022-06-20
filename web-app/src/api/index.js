import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

//creating api request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    //passing bearer auth token in headers
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//post request to API for sign in
export const signIn = (formData) => {
  try {
    const r = API.post('/user/signin', formData).catch(function (error) {
      if (error.response) {
        alert(error.response.data.error);
      }
    });
    return r;
  }
  catch (error) {
    alert('something is wrong');
  }

};

//post request to API for sign up
export const signUp = async (formData) => {
  const r = await API.post('/user/signup', formData).catch(function (error) {
    if (error.response) {
      alert(error.response.data?.error);
    }
  });
  return r;
};