import jwt from "jsonwebtoken"; 
import  createError  from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      console.log('user', req.user);
      next();
    });
  };


  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };

  export const verifyAdmin = (req, res, next) => {
    console.log("verifying admin");
    verifyToken(req, res, next, () => {
      console.log(req.user)
      if (req.user.isAdmin) {
        console.log("user is admin")
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  }; 

  // export const verifyAdmin = (req, res, next) => {
  //   // if(!req.user) {
  //   //   console.log("req.user is not set");
  //   //   return next(createError(401, "You are not authenticated!"));
  //   // }
  //   console.log("verifying admin");
  //   console.log('user', req.user); 
  //   verifyToken(req, res, next);
  //     if (req.user.isAdmin) {
  //       console.log("user is admin")
  //       next();
  //     } else {
  //       return next(createError(403, "You are not authorized!"));
  //     }
  // };  