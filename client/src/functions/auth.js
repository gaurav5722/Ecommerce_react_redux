import axios from 'axios';
export const createOrUpdateUser = async (authorization,seller="subscriber",address="near shiv nagar colony") => {
    return await axios.post(
      "http://localhost:8000/api/create-or-update-user",
      {seller,address},
      {
        headers: {
          authorization,
        },
      }
    );
  };

  export const currentUser = async (authorization) => {
    return await axios.post(
      "http://localhost:8000/api/current-user",
      {},
      {
        headers: {
          authorization,
        },
      }
    );
  };
  export const LoginUser = async (authorization) => {
    return await axios.post(
      "http://localhost:8000/api/loginUser",
      {},
      {
        headers: {
          authorization,
        },
      }
    );
  };
  
export const CheckEmail = async(email)=>
   await axios.post("http://localhost:8000/api/loginEmail",{email})
