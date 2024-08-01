export const AdminQueries = {
  createAdmin: `INSERT INTO admins (id,email,password,role)VALUES($1,$2,$3,$4)returning id,email,createdAt,role`,
  getAdminByEmail: `SELECT id,email,password,role FROM admins WHERE email=$1`,
  getAdminById: `SELECT * FROM admins WHERE id=$1`,
  createClient: `INSERT INTO client(id,email,password)VALUES($1,$2,$3)returning id,email,createdAt`,
  getClientByEmail: `SELECT * FROM client WHERE email=$1`,
  getClientById: `SELECT * FROM client WHERE id=$1`,
  updateAdminDetails: `UPDATE admins SET email = $1, password = $2 WHERE id = $3 RETURNING id, email, role,createdAt`,
  updateAdminPassword: `UPDATE admins SET  password = $1 WHERE id = $2 RETURNING id, email, role,createdAt`,

  updateClientDetails: `UPDATE client SET email = $1, password = $2 WHERE id = $3 RETURNING id, email, createdAt`,

  deleteAdmin: `delete from admins where id=$1 and role='admin'`,
  deleteClient: `delete from client where id=$1`,
  //getUserExcludingCurrentEmail:`SELECT * FROM client WHERE email=$1 AND id!=$2`;

  //     getAdminByEmailExceptUser: `
  //     SELECT id, email, role
  //     FROM admins
  //     WHERE email = $1 AND id != $2`,
  //     updateAdminsDetails:`
  //     UPDATE admins
  //     SET email = COALESCE($1, email),
  //         password = $2
  //     WHERE id = $3
  //     RETURNING id, email, role
  //   `,
};
