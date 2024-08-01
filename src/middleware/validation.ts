// const { responseProvider } = require("../helpers/helper");
// import { Request, Response, NextFunction } from "express";

// export const validateSignUpApplicantInput = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { email, firstname, lastname, username, password, phonenumber } =
//       req.body;


//     if (typeof firstname !== "string") {
//       console.log('123456y7')
//       return responseProvider(res, null, "provide a valid firstname", 400);
//     }

//     if (typeof lastname !== "string" ) {
//       return responseProvider(res, null, "provide a valid lastname", 400);
//     }

//     if (typeof parseInt(phonenumber) !== "number" || phonenumber.length < 10) {
//       return responseProvider(res, null, "provide a valid phone number", 400);
//     }

//     return next();
//   } catch (error) {
//     return next(error);
//   }
// };
