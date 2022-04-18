const connection = require("../config/dbConfig");

// Product Queries
const createNewProduct = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO products SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getAllProducts = ({ search, filter, sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM products`;
    if (search) {
      sql += ` WHERE product_name LIKE '%${search}%' ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
    } else if (filter) {
      sql += ` WHERE category_id LIKE '%${filter}%' ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
    } else {
      sql += ` ORDER BY ?? ${order} LIMIT ? OFFSET ?`;
    }
    connection.query(sql, [sort, limit, offset], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const countTotalProducts = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM products",
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

const getDetailsProductByProductId = (productId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM products WHERE product_id = ?",
      productId,
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

const updateProductByProductId = (productData, productId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE products SET ? WHERE product_id = ?",
      [productData, productId],
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

const deleteProductByProductId = (product_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM products WHERE product_id = ?",
      product_id,
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

const getProductImages = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT product_image FROM products", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = {
  createNewProduct,
  getAllProducts,
  countTotalProducts,
  getDetailsProductByProductId,
  updateProductByProductId,
  deleteProductByProductId,
  getProductImages
};
