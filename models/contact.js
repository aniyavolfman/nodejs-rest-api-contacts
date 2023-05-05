const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const listContacts = async (owner, skip, limit) => {
  const data = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  return data;
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner }).populate(
    "owner",
    "email"
  );
  return contact;
};

const removeContact = async (contactId, owner) => {
  const result = await Contact.findByIdAndRemove({
    _id: contactId,
    owner,
  });
  return result;
};

const addContact = async (body, owner) => {
  const result = await Contact.create({ ...body, owner });
  return result;
};

const updateContact = async (contactId, owner, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  );
  return result;
};

const updateStatusContact = async (contactId, owner, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner },
    body,
    {
      new: true,
    }
  ).populate("owner", "email");
  return result;
};

module.exports = {
  schemas,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
