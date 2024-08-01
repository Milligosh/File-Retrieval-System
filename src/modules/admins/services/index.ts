import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminQueries } from "../queries/index";
import pool from "../../../config/database/db";
import { apiConstants } from "../../../helpers/constants";
import { StatusCodes } from "../../../helpers/status.code";
import { GenericHelper } from "../../../helpers/generic.helper";
import config from "../../../config/env/development";
import { UserQueries } from "../../users/queries";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { GeneratePassword } from "../../../utils/email";
import validator from "validator";

export class AdminService {
  static async createAdmin(body: any): Promise<any> {
    const { email } = body;
    const existingAdmin = (
      await pool.query(AdminQueries.getAdminByEmail, [email])
    ).rows[0];
    if (existingAdmin) {
      return {
        message: apiConstants.ADMIN_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const id = GenericHelper.generateId();
    const newRequest = { id, ...body };
    // const token = jwt.sign(
    //     {
    //       id,
    //       email: body.email,

    //     },
    //     config.JWT_SECRET_KEY as string,
    //     {
    //       expiresIn: '1d',
    //       algorithm: 'HS256',
    //     },
    //   );
    const password = GenericHelper.generateComplexPassword();
    const saltRounds: number = 12;
    const hashPassword: string = bcrypt.hashSync(
      password as string,
      saltRounds
    );

    await GeneratePassword.sendCredentialsEmail(email, password);
    const create = (
      await pool.query(AdminQueries.createAdmin, [
        id,
        email,
        hashPassword,
        "admin",
      ])
    ).rows[0];
    return {
      message: apiConstants.ADMIN_CREATED,
      code: StatusCodes.OK,
      data: create,
    };
  }

  static async logIn(body: any): Promise<any> {
    const { email, password } = body;
    const Admin = (await pool.query(AdminQueries.getAdminByEmail, [email]))
      .rows[0];
    if (!Admin) {
      return {
        message: apiConstants.ADMIN_DOES_NOT_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const valid = bcrypt.compareSync(password, Admin.password);
    if (!valid) {
      return {
        message: apiConstants.INVALID_LOGIN,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const token = jwt.sign(
      {
        id: Admin.id,
        email,
        role: Admin.role,
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
  static async createClient(body: any): Promise<any> {
    const { email } = body;

    if (!validator.isEmail(email)) {
      return {
        message: apiConstants.INVALID_EMAIL,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const existingUser = (
      await pool.query(AdminQueries.getClientByEmail, [email])
    ).rows[0];
    if (existingUser) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const existingUser2 = (
      await pool.query(AdminQueries.getAdminByEmail, [email])
    ).rows[0];
    if (existingUser2) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const id = GenericHelper.generateId();
    const saltRounds: number = 12;
    const password = GenericHelper.generateComplexPassword();
    const hashPassword: string = bcrypt.hashSync(
      password as string,
      saltRounds
    );

    const create = (
      await pool.query(AdminQueries.createClient, [id, email, hashPassword])
    ).rows[0];

    // Send email to the new user
    await GeneratePassword.sendCredentialsEmail(email, password);

    return {
      message: apiConstants.USER_CREATED,
      code: StatusCodes.OK,
      data: create,
    };
  }

  static async updateAdminDetails(Id: string, body: any): Promise<any> {
    const { id, email } = body;
    const saltrounds = 10;
    //    const hashed= bcrypt.hashSync(password,saltrounds)
    const checkuser = (await pool.query(AdminQueries.getAdminById, [id]))
      .rows[0];

    if (!checkuser) {
      throw {
        message: apiConstants.ADMIN_NOT_FOUND,
        code: StatusCodes.OK,
        data: null,
      };
    }
    const userExist = (await pool.query(AdminQueries.getAdminByEmail, [email]))
      .rows[0];
    if (userExist) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const userExist2 = (
      await pool.query(AdminQueries.getClientByEmail, [email])
    ).rows[0];
    if (userExist2) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const saltRounds = 10;
    const password = GenericHelper.generateComplexPassword();
    const hashPassword = bcrypt.hashSync(password as string, saltRounds);
    const update = (
      await pool.query(AdminQueries.updateAdminDetails, [
        email,
        hashPassword,
        id,
      ])
    ).rows[0];
    await GeneratePassword.updateCredentialsEmail(email, password);
    return {
      message: apiConstants.UPDATE_SUCCESS,
      code: StatusCodes.OK,
      data: update,
    };
  }

  static async updateClientDetails(Id: string, body: any): Promise<any> {
    const { id, email } = body;
    const saltrounds = 10;
    //    const hashed= bcrypt.hashSync(password,saltrounds)
    const checkuser = (await pool.query(AdminQueries.getClientById, [id]))
      .rows[0];

    if (!checkuser) {
      throw {
        message: apiConstants.USER_NOT_FOUND,
        code: StatusCodes.OK,
        data: null,
      };
    }
    const userExist = (await pool.query(AdminQueries.getClientByEmail, [email]))
      .rows[0];
    if (userExist) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }

    const userExist2 = (await pool.query(AdminQueries.getAdminByEmail, [email]))
      .rows[0];
    if (userExist2) {
      return {
        message: apiConstants.USER_EXIST,
        code: StatusCodes.BAD_REQUEST,
        data: null,
      };
    }
    const saltRounds = 10;
    const password = GenericHelper.generateComplexPassword();
    const hashPassword = bcrypt.hashSync(password as string, saltRounds);
    const update = (
      await pool.query(AdminQueries.updateClientDetails, [
        email,
        hashPassword,
        id,
      ])
    ).rows[0];
    await GeneratePassword.updateCredentialsEmail(email, password);
    return {
      message: apiConstants.UPDATE_SUCCESS,
      code: StatusCodes.OK,
      data: update,
    };
  }

  static async deleteAdmin(id: string): Promise<any> {
    try {
      const findUser = (await pool.query(AdminQueries.getAdminById, [id]))
        .rows[0];
      if (!findUser) {
        return {
          message: apiConstants.ADMIN_DOES_NOT_EXIST,
          code: StatusCodes.BAD_REQUEST,
          data: null,
        };
      }

      if (findUser.role !== "admin") {
        return {
          message: apiConstants.CANNOT_DELETE,
          code: StatusCodes.OK,
          data: null,
        };
      }
      const deleteOneAdmin = (await pool.query(AdminQueries.deleteAdmin, [id]))
        .rows[0];
      return {
        message: apiConstants.DELETE_SUCCESS,
        code: StatusCodes.OK,
        data: null,
      };
    } catch (error) {
      return {
        message: apiConstants.DELETE_UNSUCCESSFUL,
        code: StatusCodes.OK,
        data: null,
      };
    }
  }

  static async deleteClient(id: string): Promise<any> {
    try {
      const findUser = (await pool.query(AdminQueries.getClientById, [id]))
        .rows[0];
      if (!findUser) {
        return {
          message: apiConstants.USER_DOES_NOT_EXIST,
          code: StatusCodes.BAD_REQUEST,
          data: null,
        };
      }

      // if(findUser.role!=='admin'){
      //   return{
      //     message: apiConstants.CANNOT_DELETE,
      //       code: StatusCodes.OK,
      //       data:null
      //   }
      // }
      const deleteOneClient = (
        await pool.query(AdminQueries.deleteClient, [id])
      ).rows[0];
      return {
        message: apiConstants.DELETE_SUCCESS,
        code: StatusCodes.OK,
        data: null,
      };
    } catch (error) {
      return {
        message: apiConstants.DELETE_UNSUCCESSFUL,
        code: StatusCodes.OK,
        data: null,
      };
    }
  }
}
