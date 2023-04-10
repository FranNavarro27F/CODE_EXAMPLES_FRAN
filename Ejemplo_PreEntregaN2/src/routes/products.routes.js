import { json, query, Router } from "express";
import { manager } from "../app.js";
import { uploader } from "../file_uploads.js";

const productsRouter = Router();
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const { limit, page, sort, title, stock, category } = req.query;
    const query = { title, stock, category };
    const products = await manager.getProducts(page, limit, sort, query);

    res.send({
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
    });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await manager.getProductById(pid);
    res.send({ status: "succes", payload: product });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.post("/", uploader.single("thumbnails"), async (req, res) => {
  try {
    const { title, description, price, code, stock, status, category } =
      req.body;

    let thumbnails = [];
    if (req.file) {
      thumbnails = req.file.path;
    }

    const newProduct = await manager.addProduct(
      title,
      description,
      parseInt(price),
      code,
      parseInt(stock),
      status,
      category,
      thumbnails
    );
    req.io.emit("new-product", req.body);
    res.send({ status: "succes", payload: newProduct });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { limit, page, sort, title, stock } = req.query;
    const query = { title, stock };
    const { pid } = req.params;
    await manager.updateProduct(pid, req.body);

    const products = await manager.getProducts(page, limit, sort, query);
    req.io.emit("update-product", products.docs);

    res.send({ status: "succes", payload: await manager.getProductById(id) });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { limit, page, sort, title, stock } = req.query;
    const query = { title, stock };
    const { pid } = req.params;
    await manager.deleteProduct(pid);

    const products = await manager.getProducts(page, limit, sort, query);
    req.io.emit("delete-product", products.docs);

    res.send({ status: "succes", payload: "Producto eliminado" });
  } catch (err) {
    res.status(404).send({ status: "error", error: `${err}` });
  }
});

export default productsRouter;
