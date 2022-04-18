const categoryModels = require("../models/category.js");
const standardResponse = require("../helper/responseHandling");

const cloudinary = require("../utils/cloudinary");

// Category's Controllers
const categoryList = async (req, res, next) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await categoryModels.getAllCategories({
      sort,
      order,
      limit,
      offset
    });
    const countResult = await categoryModels.countTotalCategories();
    const { total } = countResult[0];
    standardResponse.response(
      res,
      result,
      200,
      `Data Request Success! Total category: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalCategory: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    const category_image = req.file;
    const { categoryId, categoryName } = req.body;
    const cloudinaryResult = await cloudinary.uploader.upload(
      category_image.path
    );
    const dataCategory = {
      category_id: categoryId,
      category_name: categoryName,
      category_image: cloudinaryResult.secure_url
    };
    const result = await categoryModels.createNewCategory(dataCategory);
    standardResponse.response(
      res,
      dataCategory,
      200,
      `Add New Category: ${categoryName} Success!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const updatedAt = new Date();
    const category_image = req.file;
    const { categoryId, totalProductPerCategory } = req.body;
    const cloudinaryResult = await cloudinary.uploader.upload(
      category_image.path
    );
    const updateData = {
      category_image: cloudinaryResult.secure_url,
      total_product_per_category: totalProductPerCategory,
      updated_at: updatedAt
    };
    const result = await categoryModels.updateCategoryByCategoryId(
      updateData,
      categoryId
    );
    standardResponse.response(
      res,
      updateData,
      200,
      `Category ${categoryId} has been changed!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category_id = req.params.id;
    const result = await categoryModels.deleteCategoryByCategoryId(category_id);
    standardResponse.response(
      res,
      null,
      200,
      `Category ${category_id} has been deleted!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  categoryList,
  addNewCategory,
  updateCategory,
  deleteCategory
};
