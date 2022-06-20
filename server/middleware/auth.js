import jwt from "jsonwebtoken";

//secret key for jwt
const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      //getting required data from decoded data
      req.userId = decodedData?.id;
      req.email = decodedData?.email;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
      req.email = req.headers?.email;
    }    

    //move to next process 
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;