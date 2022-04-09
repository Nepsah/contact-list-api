const express = require("express");
const ContactList = require("../Model/ContactList");
const router = express.Router();
const Joi = require("Joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  celPhone: Joi.string().min(0),
  phone: Joi.string().min(0),
});

router.post("/", async (req, res) => {
  // register validation
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // check if the email already exists
  const emailExist = await ContactList.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send("Este email já existe em nosso banco de dados!");

  // create new contact
  const { name, email, celPhone, phone } = req.body;

  const contact = {
    name,
    email,
    celPhone,
    phone,
  };
  try {
    await ContactList.create(contact);
    res.status(200).json({ message: "Contato cadastrado com sucesso" });
  } catch (err) {
    res.status(422).json({ error: "Não foi possível adicionar" });
  }
});

// get
router.get("/", async (req, res) => {
  try {
    const people = await ContactList.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(400).json({ message: "Usuário não encontrado!" });
  }
});

// search
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await ContactList.findOne({ _id: id });
    if (!person) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json(person);
  } catch (err) {
    res.status(500).json({ message: "Usuário não encontrado!" });
  }
});

// update
router.patch("/:id", async (req, res) => {
  // register validation
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const id = req.params.id;

  const { name, email, celPhone, phone } = req.body;

  const contact = {
    name,
    email,
    celPhone,
    phone,
  };
  try {
    const updatedContact = await ContactList.updateOne({ _id: id }, contact);
    if (updatedContact.matchedCount === 0) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Usuário não encontrado!" });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await ContactList.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: "Usuário não encontrado!" });
    return;
  }
  try {
    await ContactList.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: "Usuário não encontrado!" });
  }
});

module.exports = router;
