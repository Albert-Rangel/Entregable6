import { productsModel } from '../models/products.model.js';

class ProductManager {

  // La variable path se inicializara desde el constructor.
  constructor() {
  }
  

  async addProduct(ObjectProduct) {

    try {

      const { title, description, price, thumbnail, code, stock, status, category } = ObjectProduct;

      const product = await productsModel.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
      });
      return `SUC|Producto agregado con el id ${product._id}`

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getProducts() {
    try {
      const products = await productsModel.find().lean();

      return products;

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getProductById(pid) {
    try {
      const found = await productsModel.find({ _id: pid });

      if (found == undefined) return `E02|El producto con el id ${pid} no se encuentra agregado.`;

      return found;

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async updateProduct(pid, product) {
    try {

      const { title, description, price, thumbnail, code, stock, status, category } = product;

      const found = await productsModel.find({ _id: pid });
      if (found == undefined) return `E02|El producto con el id ${pid} no se encuentra agregado.`;

      for (const [key, value] of Object.entries(product)) {
        found[key] = value;
      }

      await productsModel.updateOne(
        { _id: pid },
        {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          status,
          category
        });

      return `SUC|El producto con el id : ${pid} fue actualizado.`;

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async deleteProduct(pid) {
    try {

      await productsModel.deleteOne({ _id: pid });

      return `SUC|El producto con el id ${pid} fue eliminado.`
    }
    catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }
}

export default ProductManager;
