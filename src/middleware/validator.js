const Joi = require("joi");

const addNewProductValidation = (req, res, next) => {
  const {
    // category_id,
    product_name,
    product_description,
    product_price,
    product_stock
  } = req.body;
  const validateData = Joi.object({
    // category_id: Joi.string().min(3).max(12).required(),
    product_name: Joi.string().min(5).max(40).required(),
    product_description: Joi.string().required(),
    product_price: Joi.string().min(0).max(16).required().regex(/[0-9]/),
    product_stock: Joi.string().min(0).max(12).required().regex(/[0-9]/)
  });
  const { error } = validateData.validate({
    product_name: product_name,
    product_description: product_description,
    product_price: product_price,
    product_stock: product_stock
  });
  if (error) {
    const errorMessage = error.details[0].message;
    return next({ status: 422, message: errorMessage });
  } else {
    next();
  }
};

module.exports = {
  addNewProductValidation
};
