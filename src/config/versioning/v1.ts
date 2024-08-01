import express from "express";

const api = express.Router();
 import admin from "../../modules/admins/routes/index"
 import user from "../../modules/users/routes/index"
// import column from '../../routes/columns'
// import task from '../../routes/task'
// import subtask from '../../routes/subtask'
 
api.get("/", (req, res) =>
  res.status(200).json({
    status: "success",
    message: "Welcome to My App API",
  })
);

api.use("/admin", admin);
 api.use('/user',user)
// api.use('/task',task)
// api.use('/subtask',subtask)
export default api;
