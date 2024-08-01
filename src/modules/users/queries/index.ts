export const UserQueries = {
  createClient: `INSERT INTO client(id,email,password)VALUES($1,$2,$3)returning id,email,createdAt`,
  getClientByEmail: `SELECT id,email,password FROM client WHERE email=$1`,
  getClientById: `SELECT * FROM client WHERE id=$1`,
  //     checkUserExist: `SELECT
  //   client.id
  //      FROM client
  //   LEFT JOIN
  //   request ON
  //    request.user_Id =client.id WHERE client.id=$1`,
  createRequest: `INSERT INTO request (
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
        image_url,
        request_token )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)Returning *`,
  fetchRequest: `SELECT  * FROM request r
  JOIN client  c on  r.user_id=c.id WHERE c.id=$1`,
};
