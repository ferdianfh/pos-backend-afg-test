const connection = require("../config/dbConfig");

// Category Queries
const getAllCategories = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM categories ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [sort, limit, offset],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const countTotalCategories = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM categories",
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const createNewCategory = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO categories SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateCategoryByCategoryId = (categoryData, categoryId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE categories SET ? WHERE category_id = ?",
      [categoryData, categoryId],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const deleteCategoryByCategoryId = (category_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM categories WHERE category_id = ?",
      category_id,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = {
  getAllCategories,
  createNewCategory,
  countTotalCategories,
  updateCategoryByCategoryId,
  deleteCategoryByCategoryId
};
