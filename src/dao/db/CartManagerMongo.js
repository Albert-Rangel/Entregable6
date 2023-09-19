import { cartsModel } from '../models/carts.model.js';
import { productsModel } from '../models/products.model.js';

class CartManager {

  constructor() { }

  async addCart() {
    let cart2 = {}
    try {
      cart2 = { products: [] }
      const carnnew = await cartsModel.create(cart2)
      return `SUC|Carrito agregado con el id ${carnnew._id}`

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async addCartProducts(pid, cid) {
    try {
      const cartObject = await cartsModel.findById({ _id: cid })

      if (cartObject == undefined) return `E02|El carro con el id ${cid} no se encuentra agregado.`;

      const productObject = await productsModel.find({ _id: pid })

      if (productObject == undefined) return `E02|El producto con el id ${pid} no se encuentra agregado.`;

      if (cartObject.products.find(prod => prod.pid === pid)) {

        let ProductinsideCart = cartObject.products.find(prod => prod.pid === pid)

        ProductinsideCart.quantity += 1

        cartObject.save(); 

        return `SUC|Producto sumado al carrito con el producto ya existente`
      }
      
      cartObject.products.push({ pid, quantity:1 });

      await cartObject.save();

      return `SUC|Producto agregado al carrito ${cid}`

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getCarts() {
    try {
      const allCarts = await cartsModel.find();
      return allCarts

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async getCartById(cid) {
    try {

      const CartById = await cartsModel.find({ _id: cid });

      if (CartById == undefined) return `E02|El carro con el id ${cid} no se encuentra agregado.`;

      return CartById

    } catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }

  async deleteCart(cid) {
    try {

      await cartsModel.deleteOne({ _id: cid })

      return `SUC|El carrito con el id ${cid} fue eliminado.`
    }
    catch (error) {
      return `ERR|Error generico. Descripcion :${error}`
    }
  }
}

export default CartManager;



