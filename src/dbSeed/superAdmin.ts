import { configDotenv } from "dotenv";
configDotenv();
import bcrypt from "bcrypt";
import pool from "../config/database/db.js";
import { GenericHelper } from "../helpers/generic.helper.js";
const {
  SUPER_ADMIN_EMAIL: email,
  SUPER_ADMIN_PASSWORD: password,
  SUPER_ADMIN_PHONENUMBER: phonenumber,
} = process.env;

const addSuper:string = `
    INSERT INTO admins(
        id,
        email,
        password,
        role
    )VALUES($1,$2,$3,$4) RETURNING id,email,role, createdAt
    `;
    const id = GenericHelper.generateId();
const saltRounds: number = 12;
const hashPassword:string = bcrypt.hashSync(password as string, saltRounds);

const func = ():void => {
  console.log("ready to seed in super admin...");
  const response = pool
    .query(addSuper, [
        id,
      email,
      hashPassword,
      "superadmin",
    ])
    .then(() => {
      console.log("seeding completed with no issues.🎉...");
      process.exit(0);
    })
    .catch((e:Error) => {
      console.log("Error", e.message);
      process.exit(1);
    });
};
func();
