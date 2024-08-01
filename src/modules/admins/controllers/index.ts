import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services";

export class AdminController {
  static async createAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.createAdmin(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async logInAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.logIn(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.createClient(req.body);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateAdminDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.updateAdminDetails(
        (req as any)?.user?.id,
        {
          ...req.body,
          id: req.params.id,
        }
      );
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async updateUserDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.updateClientDetails(
        (req as any)?.user?.id,
        {
          ...req.body,
          id: req.params.id,
        }
      );
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
  static async deleteAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.deleteAdmin(req.params.id);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await AdminService.deleteClient(req.params.id);
      return res.status(result.code).json(result);
    } catch (error) {
      next(error);
    }
  }
}
