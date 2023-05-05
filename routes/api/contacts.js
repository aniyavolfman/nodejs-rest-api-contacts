const express = require("express");
const {
  schemas,
  updateStatusContact,
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contact");
const { HttpError } = require("../../helpers/index");
const { isValidId, auth } = require("../../middlewares/index");

const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await listContacts(owner, skip, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", auth, isValidId, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await getContactById(contactId, owner);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `missing required name field: ${error.message}`);
    }
    const { _id: owner } = req.user;
    const result = await addContact(req.body, owner);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", auth, isValidId, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await removeContact(contactId, owner);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", auth, isValidId, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `Missing fields: ${error.message}`);
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, owner, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  async (req, res, next) => {
    try {
      const { _id: owner } = req.user;
      const { error } = schemas.updateFavoriteSchema.validate(req.body);
      if (error) {
        throw HttpError(400, `Missing fields: ${error.message}`);
      }
      const { contactId } = req.params;
      const result = await updateStatusContact(contactId, owner, req.body);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
