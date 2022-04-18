<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Backend API POS Application</h3>

  <p align="center">
    Created for technical test ASEAN Fintech Group
  </p>
</div>

## Built With

This backend side app was built with some technologies below:

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Cloudinary](https://cloudinary.com/)
- [Heroku](https://www.heroku.com/)
- [AWS](https://aws.amazon.com/id/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node.js - Download and Install [Node.js](https://nodejs.org/en/).
- MySQL - Download and Install [MySQL Server](https://www.mysql.com/downloads/)
- Nodemon - Download and Install [Nodemon](https://www.npmjs.com/package/nodemon)

### Installation

1. Clone the APIs repo

   ```sh
   git clone https://github.com/ferdianfh/pos-backend-afg-test.git
   ```

2. Move to project directory
   ```sh
   cd folder-project
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set Environtment variable in `.env` file

   ```sh
   DB_HOST = YOUR_DB_HOST
   DB_USER = YOUR_DB_USER
   DB_PASSWORD = YOUR_DB_PASSWORD
   DB_NAME = YOUR_DB_NAME

   PORT = YOUR_PORT

   CLOUDINARY_CLOUD_NAME = YOUR_CLOUD_NAME
   CLOUDINARY_API_KEY = YOUR_CLOUD_API_KEY
   CLOUDINARY_API_SECRET = YOUR_CLOUD_API_SECRET
   ```

5. Start the Application
   ```sh
   npm run dev
   ```

## Postman Collection

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/17519297/Uyr5of6m)

<p align="right">(<a href="#top">back to top</a>)</p>

## API Endpoint

### Base URL

- Base URL
  ```sh
     https://pos-afg.herokuapp.com
  ```

### Products Endpoint

| No  | HTTP Method | URI                                      | Operation                               |
| --- | ----------- | ---------------------------------------- | --------------------------------------- |
| 1   | GET         | /api/products                            | Get list products                       |
| 2   | GET         | /api/products/details/:product_id        | Get details product by productId        |
| 3   | POST        | /api/products/add-new-product            | Add New Product to database             |
| 4   | PUT         | /api/products/update-product/:product_id | Update Product Information by productId |
| 5   | DELETE      | /api/products/delete-product/:product_id | Delete product by productId             |

Params:

- name (product_name, string)
- category (category_id, string), ex: makanan, minuman
- limit (int), ex: 4
- page (int), ex: 2

### Categories Endpoint

| No  | HTTP Method | URI                                 | Operation                     |
| --- | ----------- | ----------------------------------- | ----------------------------- |
| 1   | GET         | /api/categories                     | Get all categories            |
| 3   | POST        | /api/categories/create-new-category | Create New Category           |
| 4   | PUT         | /api/categories/update-category     | Update Category Information   |
| 5   | DELETE      | /api/categories/delete-category/:id | Delete Category by categoryId |

## Contact

Ferdi Ferdiana - [Linkedin](https://www.linkedin.com/in/ferdianfh/) - ferdifh82@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>
