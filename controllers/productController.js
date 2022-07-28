const db = require("../database/models");
const Product = db.Products;

const store = async (req, res) => {
  try {
    const save = await Product.create(req.body);
    res.json(save).status(200);
  } catch (error) {
    res.json(error).status(422);
  }
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

const update = (req, res) => {
  Product.findByPk(req.params.id)
    .then((emp) => {
      if (emp) {
        emp.update(req.body);
        msg = emp;
      } else {
        msg = `Products ${req.params.id} Not Found`;
      }
      res.json({ message: msg });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const destroy = (req, res) => {
  let msg;
  Product.findByPk(req.params.id)
    .then((row) => {
      if (row) {
        row.destroy();
        msg = "success deleted";
      } else {
        msg = `Products ${req.params.id} Not Found`;
      }
      res.json({ message: msg });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
