import express from "express"
import handlebars from "express-handlebars"
import { Server } from 'socket.io'
import __dirname from './utils.js'

import ProductRoutes from './router/productMongo.routes.js'
//import ProductRoutes from './router/product.routes.js'

import CartRoutes from './router/cartMongo.routes.js'
//import CartRoutes from './router/cart.routes.js'

import ChatsRoutes from './router/chat.routes.js'

import ProductManager from './dao/db/ProductsManagerMongo.js'
//import ProductManager from './dao/fs/ProductManager.js'

import ViewsRouter from './router/views.routes.js'

import mongoose from "mongoose"

import { uploader } from './dao/middlewares/multer.js'
import { messagesModel } from "./dao/models/messages.model.js"

const productManager = new ProductManager();
const port = 8080
const app = express()

//Creacion del servidorHTTP
const HTTPserver = app.listen(port, () =>
  console.log(`Port listening on port ${HTTPserver.address().port}`)
);

//Conetando con Atlas
mongoose.connect('mongodb+srv://albertsleyther:<password>@ecommerce.6lrddnh.mongodb.net/?retryWrites=true&w=majority');

//Creacion del servidor con Socketio
const Socketserverio = new Server(HTTPserver)

//Mi socketSServer a la escucha
Socketserverio.on('connection', async (socket) => {

  console.log(`client connected with id ${socket.id}`)

  const productList = await productManager.getProducts();

  Socketserverio.emit('AllProducts', productList)

  socket.on('sendNewProduct', async (newP) => {

    const newProduct = {
      description: newP.description,
      title: newP.title,
      price: parseInt(newP.price, 10),
      thumbnail: newP.thumbnail,
      code: newP.code,
      stock: parseInt(newP.stock, 10),
      status: newP.status,
      category: newP.category,

    }
    await productManager.addProduct(newProduct);
    const productList = await productManager.getProducts();
    Socketserverio.emit('AllProducts', productList)
  })

  socket.on('functionDeleteProduct', async (idp) => {
    await productManager.deleteProduct(idp);
    const productList = await productManager.getProducts();
    Socketserverio.emit('AllProducts', productList)
  })

  socket.on('message', async (data) => {
    await messagesModel.create(data)
    const messag = await messagesModel.find().lean()
    Socketserverio.emit('newMessage',messag)
  })

})

HTTPserver.on("error", (error) => console.log`Server error ${error}`)

//Seccion de handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

//Seccion de Static
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', ProductRoutes)
app.use('/api/carts', CartRoutes)
app.use('/api/chats', ChatsRoutes)
app.use('/', ViewsRouter)

