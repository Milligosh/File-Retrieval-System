import express, { Request, Response, NextFunction } from "express";
import pool from "./config/database/db";
import dotenv from "dotenv";
import multer from "multer";
import {
  appErrorHandler,
  genericErrorHandler,
  notFound,
} from "../src/middleware/error.middleware";
import {
  verifyToken,
  checkAuthorizationToken,
  isSuperAdmin,
} from "./middleware/authorization";
import api from "../src/config/versioning/v1";
// import { storage } from "./utils/multer";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer(); // Initialize multer

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle file uploads using multer middleware
// app.post("/test", upload.single(''), (req, res) => {
//   // For JSON body
//   res.send({
//     body: req.body,
//     files: req.files,
//   });
// });

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});

app.use("/api/v1", api);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(checkAuthorizationToken);
app.use(isSuperAdmin);
app.use(notFound);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.code ?? 500).json(error);
});
