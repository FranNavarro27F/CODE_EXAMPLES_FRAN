import { json, Router } from "express";
import { manager } from "../app.js";

const viewsRouter = Router();
viewsRouter.use(json());

viewsRouter.get("/", async (req, res) => {
  const { page, limit, sort, title, stock } = req.query;
  const query = { title, stock };
  const products = await manager.getProducts(page, limit, sort, query);
  res.render("home", { products });
});

viewsRouter.get("/real-time-products", async (req, res) => {
  try {
    const { page, limit, sort, title, stock } = req.query;
    const query = { title, stock };
    const products = await manager.getProducts(page, limit, sort, query);
    res.render("real-time-products", { products });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

viewsRouter.get("/chat", async (req, res) => {
  try {
    res.render("chat");
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page, limit, sort, title, stock } = req.query;
    const query = { title, stock };
    let products = await manager.getProducts(page, limit, sort, query);
    products = {
      status: "succes",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    };
    console.log(products);
    res.render("products", { products });
  } catch (err) {
    res.status(500).send({ status: "error", payload: err.message });
  }
});

export default viewsRouter;
