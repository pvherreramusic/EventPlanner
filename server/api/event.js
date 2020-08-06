const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../db");

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");

  next();
});

productsRouter.get("/", async (req, res) => {
  const products = await getAllProducts();

  console.log("got products: ", products);

  res.send({
    message: "Successfully retrieved products",
    products,
    status: true,
  });
});

productsRouter.get("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  console.log("entered productId", eventId);

  try {
    const event = await getEventById(eventId);

    console.log("got product: ", event);

    if (!product) {
      return res.status(404).json({
        error: `No product found with Id: ${event}}`,
      });
    }

    res.send({
      event,
    });
  } catch (error) {
    throw error;
  }
});


productsRouter.patch("/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  const { title, description, price, inventory } = req.body;
  const updateFields = {};

  if (title) {
    updateFields.title = title;
  }

  if (description) {
    updateFields.description = description;
  }

  try {
    const originalEvent = await getProductById(eventId);

    if (originalEvent) {
      const updatedEvent = await updateProduct(eventId, updateFields);
      res.send({ event:  updatedEvent});
    } else {
      next({
        name: "UpdateEventError",
        message: "Error updating event",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { title, description, price, inventory } = req.body;

  const productData = { title, description, price, inventory };
// if(!user)
  try {
    const product = await createProduct(productData);

    if (product) {
      res.send({ product });
    } else {
      next({
        name: "CreateProductError",
        message: "Error creating product",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const product = await deleteProduct(req.params.productId);

    if (routine) {
      res.send({ product });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = productsRouter;