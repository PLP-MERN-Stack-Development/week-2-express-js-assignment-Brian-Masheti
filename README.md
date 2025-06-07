# Product API

A RESTful API built with Express.js and MongoDB for managing products in an e-commerce-like system. This project fulfills the Week 2 assignment requirements, supporting CRUD operations, authentication, and JSON-based product data with image paths and color attributes.

## Project Overview

This API allows users to create, read, update, and delete products, with protected routes requiring API key authentication. Products include fields like name, description, price, category, stock status, and image path. The API is tested using Postman and serves static images from an `images/` folder.

## Setup

1. **Clone the Repository**

```bash
git clone [https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Brian-Masheti.git](https://github.com/PLP-MERN-Stack-Development/week-2-express-js-assignment-Brian-Masheti.git)
cd week-2-express-js-assignment-Brian-Masheti
   ```bash
   git clone <your-repo-url>
   cd week-2-express-js-assignment-Brian-Masheti
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Edit `.env` with your MongoDB URI and API key:
     ```
     MONGO_URI=mongodb://localhost:27017/productsDB
     PORT=5000
     API_KEY=your-secret-key-here
     ```

4. **Create Images Folder**:
   - Create an `images/` folder in the project root to store product images (e.g., `images/tablet.png`).

5. **Run MongoDB**:
   Ensure MongoDB is running locally:
   ```bash
   mongod
   ```

6. **Start the Server**:
   ```bash
   pnpm run dev
   ```

   The server runs at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint                | Description                     | Authentication         |
|--------|-------------------------|---------------------------------|------------------------|
| GET    | `/api/products`         | Retrieve all products           | Public                 |
| GET    | `/api/products/:id`     | Retrieve a product by ID        | Public                 |
| POST   | `/api/products`         | Create a new product            | Requires API key       |
| PUT    | `/api/products/:id`     | Update a product                | Requires API key       |
| DELETE | `/api/products/:id`     | Delete a product                | Requires API key       |

### Authentication
- Protected routes (`POST`, `PUT`, `DELETE`) require an `Authorization` header:
  ```
  Authorization: Bearer <your-api-key>
  ```
- Replace `<your-api-key>` with the `API_KEY` from your `.env` file.

### Product Fields
- **name**: String, required (e.g., "Headphones")
- **description**: String, optional (e.g., "Wireless noise-canceling water-resistant headphones")
- **price**: Number, required, non-negative (e.g., 150)
- **category**: String, optional (e.g., "electronics")
- **inStock**: Boolean, default `true`
- **image**: String, optional, path to image (e.g., "images/headphones.png")
- **color**: String, optional (e.g., "Black")

### Image Support
- The `image` field in `POST` and `PUT` requests accepts a string path (e.g., `"image": "images/headphones.png"`).
- Images are served statically from the `images/` folder (e.g., `http://localhost:5000/images/headphones.png`).
- Place image files in the `images/` folder to make them accessible.

## Example Requests

### GET /api/products
- **Request**:
  ```bash
  curl http://localhost:5000/api/products
  ```
- **Response** (200 OK):
  ```json
  [
    {
      "_id": "...",
      "name": "Headphones",
      "description": "Wireless noise-canceling water-resistant headphones",
      "price": 150,
      "category": "electronics",
      "inStock": true,
      "image": "images/headphones.png",
      "color": "Black",
      "createdAt": "...",
      "updatedAt": "...",
      "__v": 0
    },
    ...
  ]
  ```

### POST /api/products
- **Request**:
  ```bash
  curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Blender","description":"High-speed blender for smoothies","price":80,"category":"kitchen","inStock":true,"image":"images/blender.png","color":"Silver"}'
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "...",
    "name": "Blender",
    "description": "High-speed blender for smoothies",
    "price": 80,
    "category": "kitchen",
    "inStock": true,
    "image": "images/blender.png",
    "color": "Silver",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  }
  ```

### PUT /api/products/:id
- **Request**:
  ```bash
  curl -X PUT http://localhost:5000/api/products/<headphones-id> \
  -H "Authorization: Bearer <your-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Headphones","description":"Wireless noise-canceling water-resistant headphones","price":150,"category":"electronics","inStock":true,"image":"images/headphones.png","color":"Black"}'
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "<headphones-id>",
    "name": "Headphones",
    "description": "Wireless noise-canceling water-resistant headphones",
    "price": 150,
    "category": "electronics",
    "inStock": true,
    "image": "images/headphones.png",
    "color": "Black",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  }
  ```

### DELETE /api/products/:id
- **Request**:
  ```bash
  curl -X DELETE http://localhost:5000/api/products/<headphones-id> \
  -H "Authorization: Bearer <your-api-key>"
  ```
- **Response** (200 OK):
  ```json
  {
    "message": "Product deleted"
  }
  ```

## Testing
- Use Postman or `curl` to test endpoints.
- **Public Routes**: Test `GET /api/products` and `GET /api/products/:id` without headers.
- **Protected Routes**: Include the `Authorization` header for `POST`, `PUT`, and `DELETE`.
- **Image Testing**: Place images in the `images/` folder and access them via `http://localhost:5000/images/<filename>`.

## Notes
- The API uses MongoDB to store products, with seeded data (Laptop, Smartphone, Coffee Maker) loaded on startup.
- Images are served statically; no file uploads are supported (JSON-based image paths only).
- Advanced features like filtering, pagination, and search are planned for future enhancements.

## Requirements
- Node.js (v18 or higher)
- MongoDB
- Postman or `curl` for testing
- pnpm for package management

## Project Structure
- `server.js`: Entry point, sets up Express and middleware.
- `models/Product.js`: Mongoose schema for products.
- `controllers/productController.js`: Handles CRUD logic.
- `routes/productRoutes.js`: Defines API routes.
- `middleware/`: Contains `authMiddleware.js`, `loggerMiddleware.js`, and `errorMiddleware.js`.
- `config/`: Includes `db.js` for MongoDB connection and `seed.js` for initial data.
- `images/`: Stores static image files.
- `.env`: Environment variables (not committed).
- `.gitignore`: Excludes `.env` and `node_modules`.

## Acknowledgments
- Built as part of the PLP Feb 2025 Cohort MERN assignments.
- Thanks to the instructor for guidance and requirements.