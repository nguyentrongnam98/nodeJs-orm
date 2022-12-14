import pool from "../config/connectDb";
import multer from "multer";

const homeController = {
  homePage: async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM user");
    return res.render("index.ejs", { dataUser: rows, test: "Nam" });
  },
  detailPage: async (req, res) => {
    let { id } = req.params;
    let [user, fields] = await pool.execute(
      `SELECT * FROM user where id = ? `,
      [id]
    );
    console.log(user);
  },
  createUser: async (req, res) => {
    const { firstName, lastName, email, address } = req.body;
    await pool.execute(
      "insert into user(firstName,lastName,email,address) values (?, ? ,? ,?)",
      [firstName, lastName, email, address]
    );
    return res.redirect("/");
  },
  deleteUser: async (req, res) => {
    const { userId } = req.body;
    await pool.execute("delete from user where id = ?", [userId]);
    return res.redirect("/");
  },
  editPage: async (req, res) => {
    let { id } = req.params;
    let [user, fields] = await pool.execute("select * from user where id = ?", [
      id,
    ]);
    return res.render("updateUser.ejs", { dataUser: user[0] });
  },
  updateUser: async (req, res) => {
    const { firstName, lastName, email, address, id } = req.body;
    await pool.execute(
      "update user set firstName = ?, lastName = ?, email = ?  , address = ? where id = ?",
      [firstName, lastName, email, address, id]
    );
    return res.redirect("/");
  },
  getUploadFilePage: async (req, res) => {
    return res.render("uploadFile.ejs");
  },
  handleUploadFile: async (req, res) => {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.file) {
        return res.send("Please select an image to upload");
      }

      // Display uploaded image for user validation
      res.send(
        `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`
      );
  },
  handleUploadMultipleFile: async (req, res) => {
      if (req.fileValidationError) {
        return res.send(req.fileValidationError);
      } else if (!req.files) {
        return res.send("Please select an image to upload");
      }
      // The same as when uploading single images

      let result = "You have uploaded these images: <hr />";
      const files = req.files;
      let index, len;

      // Loop through all the uploaded images and display them on frontend
      console.log(files);
      for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
      }
      result += '<hr/><a href="/upload">Upload more images</a>';
      res.send(result);
  },
};

export default homeController;
