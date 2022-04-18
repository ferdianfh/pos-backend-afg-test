const productControllers = require("../controller/product");
const upload = require("../utils/multer");
const router = require("express").Router();
const { addNewProductValidation } = require("../middleware/validator");

router
  .get("/", productControllers.productList)
  .get("/details/:product_id", productControllers.productDetails)
  .post(
    "/add-new-product",
    upload.single("product_image"),
    productControllers.addNewProduct
  )
  .put(
    "/update-product/:product_id",
    upload.single("product_image"),
    productControllers.updateProductInfo
  )
  .delete("/delete-product/:product_id", productControllers.deleteProduct);

module.exports = router;
