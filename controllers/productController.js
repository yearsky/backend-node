const db = require("../database/models");
const path = require("path");
const fs = require("fs");
const Product = db.Products;

const store = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  console.log(req);
  const file = req.files.picture;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const allowedType = [".png", ".jpg", ".jpeg"];
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const attr = {
    name: req.body.name,
    qty: req.body.qty,
    picture: url,
    expiredAt: req.body.expiredAt,
    isActive: req.body.isActive,
  };
  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create(attr);
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

const index = async (req, res) => {
  try {
    const result = await Product.findAndCountAll();
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findByPk(id);
    const result = data
      ? data
      : {
          message: `Products ${id} Not Found`,
        };
    res.json(result).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
};

const update = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ msg: "No Data Found" });
  var pct = product.picture;
  var pname = pct.substring(pct.lastIndexOf("/") + 1);
  let fileName = "";
  if (req.files === null) {
    fileName = pname;
  } else {
    const file = req.files.picture;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${pname}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const attr = {
    name: req.body.name,
    qty: req.body.qty,
    picture: url,
    expiredAt: req.body.expiredAt,
    isActive: req.body.isActive,
  };
  try {
    await Product.update(attr, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

const destroy = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ msg: "No Data Found" });
  let msg;
  try {
    var pct = product.picture;
    var pname = pct.substring(pct.lastIndexOf("/") + 1);
    const filepath = `./public/images/${pname}`;
    fs.unlinkSync(filepath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
