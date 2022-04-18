const { v4: uuidv4 } = require("uuid");
const productModels = require("../models/product");
const standardResponse = require("../helper/responseHandling");
const cloudinary = require("../utils/cloudinary");

// Product Controllers
const addNewProduct = async (req, res, next) => {
  try {
    const productId = uuidv4();
    const productData = req.body;
    const product_image = req.file;
    const cloudinaryResult = await cloudinary.uploader.upload(
      product_image.path
    );
    const newProductData = {
      product_id: productId,
      category_id: productData.category_id,
      product_name: productData.product_name,
      product_image: cloudinaryResult.secure_url,
      product_description: productData.product_description,
      product_price: productData.product_price,
      product_stock: productData.product_stock
    };
    const result = await productModels.createNewProduct(newProductData);
    standardResponse.response(
      res,
      newProductData,
      200,
      "Add New Product Success!"
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const productList = async (req, res, next) => {
  try {
    const search = req.query.name;
    const filter = req.query.category;
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const result = await productModels.getAllProducts({
      search,
      filter,
      sort,
      order,
      limit,
      offset
    });
    const countResult = await productModels.countTotalProducts();
    const { total } = countResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data Request Success! Total products: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalProduct: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const productDetails = async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const [product] = await productModels.getDetailsProductByProductId(
      productId
    );

    standardResponse.response(
      res,
      product,
      200,
      `Product with id: ${productId} successfully requested!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateProductInfo = async (req, res, next) => {
  try {
    const updatedAt = new Date();
    const product_image = req.file;
    const productId = req.params.product_id;
    const { product_name, product_description, product_price, product_stock } =
      req.body;
    const cloudinaryResult = await cloudinary.uploader.upload(
      product_image.path
    );
    const updateData = {
      product_name: product_name,
      product_image: cloudinaryResult.secure_url,
      product_description: product_description,
      product_price: product_price,
      product_stock: product_stock,
      updated_at: updatedAt
    };
    const result = await productModels.updateProductByProductId(
      updateData,
      productId
    );
    standardResponse.response(
      res,
      updateData,
      200,
      `Product with id: ${productId} has been changed!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product_id = req.params.product_id;
    const result = await productModels.deleteProductByProductId(product_id);
    standardResponse.response(
      res,
      null,
      200,
      `Product with id: ${product_id} has been deleted!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  addNewProduct,
  productList,
  productDetails,
  updateProductInfo,
  deleteProduct
};
