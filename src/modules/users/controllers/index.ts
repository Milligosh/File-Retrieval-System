import { Request, Response, NextFunction } from "express";
import { UserService } from "../services";

import cloudinary from '../../../utils/cloudinary'

export class UserController {
  static async logInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await UserService.logInUser(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async createNewRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      
     // const file = req.files;
      const file = Array.isArray(req.files) ? req.files[0] : undefined;
      //const file = req.files && req.files.length > 0 ? req.files[0] : undefined;
      const result = await UserService.createRequest({
        ...req.body,
        file: req.file,
        user_id: (req as any)?.user?.id,
       
      },file);
      
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async fetchRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await UserService.fetchRequest(req.params.id);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
}
