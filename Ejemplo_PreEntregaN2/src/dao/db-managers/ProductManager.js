import producModel from "../models/product.model.js";

export default class ProductManager {
  constructor() {
    "Working with DB system.";
  }

  async getProducts(page, limit, sort, query) {
    try {
      let newQuery = {};

      if (query.category) {
        newQuery.category = query.category;
      }
      if (query.title) {
        newQuery.title = query.title;
      }
      if (query.stock) {
        newQuery.stock = query.stock;
      }

      if (sort === "asc") {
        sort = { price: "asc" };
      } else if (sort === "desc") {
        sort = { price: "desc" };
      }

      const products = await producModel.paginate(newQuery, {
        limit: limit ?? 10,
        lean: true,
        page: page ?? 1,
        sort: sort ?? "null",
      });

      if (sort) products.sort = newSort;

      products.prevLink = products.hasPrevPage
        ? `http://localhost:8080/api/products?page=${products.prevPage}`
        : null;

      products.nextLink = products.hasNextPage
        ? `http://localhost:8080/api/products?page=${products.nextPage}`
        : null;

      return products;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async addProduct(
    title,
    description,
    price,
    code,
    stock,
    status,
    category,
    thumbnails
  ) {
    try {
      const product = {
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category,
      };
      const result = await producModel.create(product);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await producModel.findById(id);
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteProduct(id) {
    try {
      const result = await producModel.deleteOne({ _id: id });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProduct(id, propModify) {
    try {
      const result = await producModel.findOneAndUpdate(
        { _id: id },
        propModify,
        { new: true }
      );
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }
}
