require("dotenv/config");
const knex = require("../database");
const Yup = require("yup");

const defaultValidations = {
  name: Yup.string()
    .notRequired("Nome completo é obrigatório.")
    .typeError("Nome completo é obrigatório."),
  lastname: Yup.string()
    .notRequired(`Ultimo nome é obrigatório.`)
    .typeError("Ultimo nome é obrigatório."),
  document: Yup.string()
    .notRequired(`CPF nome é obrigatório.`)
    .typeError("CPF nome é obrigatório."),
};

module.exports = {
  store: async (req, res) => {
    // const validationsData = ;
    try {
      const schema = Yup.object().shape(defaultValidations);
      //

      await schema.validate(req.body, {
        abortEarly: false,
      });

      if (Object.keys(req.body).length <= 0) {
        return res.status(400).json({
          hasError: true,
          data: "Por favor, insira os dados necessários",
        });
      }

      const { name, document, lastname } = req.body;

      const [response] = await knex("users").insert({
        name: name || "",
        document: document || "",
        lastname: lastname || "",
        rg_uri: req.file.filename || "",
      });

      return res.json({
        ok: true,
        request_body: { ...req.body, file: req.file },
        data: response,
      });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }

      if (Object.keys(validationErrors).length >= 1) {
        return res.status(400).json({ hasError: true, data: validationErrors });
      }

      console.log(err);

      return res.status(500).json({
        data: "Aconteceu um erro inesperado, por favor, retorne mais terde.",
        error: JSON.stringify(err),
      });
    }
  },
  update: async (req, res) => {
    // const validationsData = ;
    try {
      const schema = Yup.object().shape(defaultValidations);
      //

      await schema.validate(req.body, {
        abortEarly: false,
      });

      if (Object.keys(req.body).length <= 0) {
        return res.status(400).json({
          hasError: true,
          data: "Por favor, insira os dados necessários",
        });
      }

      const user = await knex("users").where({ id: req.params.id });

      if (user.length <= 0) {
        return res.status(401).json({ data: "Usáario não encontrado." });
      }

      const { name, document, lastname } = req.body;

      await knex("users")
        .update({
          name: name || "",
          document: document || "",
          lastname: lastname || "",
          rg_uri: req.file.filename || "",
        })
        .where({ id: req.params.id });

      return res.json({ ok: true, data: { ...req.body, file: req.file } });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }

      if (Object.keys(validationErrors).length >= 1) {
        return res.status(400).json({ hasError: true, data: validationErrors });
      }

      return res.status(500).json({
        data: "Aconteceu um erro inesperado, por favor, retorne mais terde.",
        error: JSON.stringify(err),
      });
    }
  },
  show: async (req, res) => {
    // const validationsData = ;
    try {
      const { id } = req.params;

      const data = await knex("users").where({ id });

      delete data.created_at;
      delete data.updated_at;

      return res.json({
        ok: true,
        data: {
          ...data[0],
          rg_uri:
            data[0].rg_uri.length >= 1
              ? `${process.env.UPLOAD_URL}/${data[0].rg_uri}`
              : undefined,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        data: "Aconteceu um erro inesperado, por favor, retorne mais terde.",
        error: JSON.stringify(err),
      });
    }
  },
};
