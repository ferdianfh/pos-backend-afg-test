const categoryControllers = require("../controller/category");
const upload = require("../utils/multer");
const router = require("express").Router();

router
  .get("/", categoryControllers.categoryList)
  .post(
    "/create-new-category",
    upload.single("category_image"),
    categoryControllers.addNewCategory
  )
  .put(
    "/update-category",
    upload.single("category_image"),
    categoryControllers.updateCategory
  )
  .delete("/delete-category/:id", categoryControllers.deleteCategory);

module.exports = router;
