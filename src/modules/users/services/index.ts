import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserQueries } from "../queries/index";
import pool from "../../../config/database/db";
import { apiConstants } from "../../../helpers/constants";
import { StatusCodes } from "../../../helpers/status.code";
import { GenericHelper } from "../../../helpers/generic.helper";
import config from "../../../config/env/development";
import cloudinary from "../../../utils/cloudinary";

export class UserService {
  static async logInUser(body: any): Promise<any> {
    const { email, password } = body;
    const User = (await pool.query(UserQueries.getClientByEmail, [email]))
      .rows[0];
    if (!User) {
      return {
        message: apiConstants.USER_DOES_NOT_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const valid = bcrypt.compareSync(password, User.password);
    if (!valid) {
      return {
        message: apiConstants.INVALID_LOGIN,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const token = jwt.sign(
      {
        id: User.id,
        email,
      },
      config.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
        algorithm: "HS256",
      }
    );
    return {
      message: apiConstants.LOGIN_SUCCESS,
      code: StatusCodes.OK,
      data: token,
    };
  }

  static async createRequest(body: any,file: Express.Multer.File | undefined): Promise<any> {
    const {
      
      user_id,
      firstname,
      lastname,
      organization,
      faxnumber,
      mailingAdddress1,
      mailingAdddress2,
      city,
      state,
      zipCode,
      country,
      request,
      expedited_process,
      phonenumber,
      justification
    } = body;

    const id = GenericHelper.generateId();
    const newerRequest = { id, ...body };
    try {
      //   const checkExistence= (await pool.query(UserQueries.getClientByEmail,[email])).rows[0]
      // if(!checkExistence){
      //   return{
      //     message: apiConstants.USER_DOES_NOT_EXIST,
      //     code: StatusCodes.BAD_REQUEST,
      //     data:null
      //   }
      // }
      const request_token = GenericHelper.generateToken()

      let imageUrl: string | undefined;

        if (file) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'requests',
                allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            });
            imageUrl = result.secure_url;
        }
      const newRequest = (
        await pool.query(UserQueries.createRequest, [
          id,
          user_id,
          firstname,
          lastname,
          organization,
          faxnumber,
          mailingAdddress1,
          mailingAdddress2,
          city,
          state,
          zipCode,
          country,
          request,
          expedited_process,
          phonenumber,
          justification,
          imageUrl,
           request_token,
        ])
      ).rows[0];
      return {
        message: apiConstants.REQUEST_CREATED,
        code: StatusCodes.OK,
        data: newRequest
      };
    } catch (error) {
      
      return {
        message: apiConstants.REQUEST_NOT_CREATED,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
  }
  static async fetchRequest(id: string): Promise<any> {
    const checkExistence = (await pool.query(UserQueries.getClientById, [id]))
      .rows[0];
    if (!checkExistence) {
      return {
        message: apiConstants.REQUEST_NOT_FETCHED,
        code: StatusCodes.OK,
        data: null,
      };
    }
    const fetch = (await pool.query(UserQueries.fetchRequest, [id])).rows;
    return {
      message: apiConstants.REQUEST_FETCHED,
      code: StatusCodes.OK,
      data: fetch,
    };
  }
}
