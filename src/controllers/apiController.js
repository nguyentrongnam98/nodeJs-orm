import pool from "../config/connectDb";
const apiController = {
  getAllUser: async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM user");
    return res.status(200).json({ msg: "success", data: rows });
  },
  createUser: async (req, res) => {
    const { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
      return res.status(404).json({ msg: "Missing require params" });
    }
    await pool.execute(
      "insert into user(firstName,lastName,email,address) values (?, ? ,? ,?)",
      [firstName, lastName, email, address]
    );
    return res.status(200).json({ msg: "create success" });
  },
  editUser: async (req, res) => {
    let { id } = req.params;
    const { firstName, lastName, email, address } = req.body;
    await pool.execute(
      "update user set firstName = ?, lastName = ?, email = ?  , address = ? where id = ?",
      [firstName, lastName, email, address, id]
    );
    return res.status(200).json({ msg: "Edit user success" });
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    await pool.execute("delete from user where id = ?", [id]);
    return res.status(200).json({ msg: "Delete user success" });
  },
  detailUser: async (req,res) => {
    let { id } = req.params;
    let [user, fields] = await pool.execute(
      `SELECT * FROM user where id = ? `,
      [id]
    );
    if (user.length === 0) {
        return res.status(500).json({msg:"User not found"})
    }
    return res.status(200).json({data:user})
  }
};

export default apiController;
