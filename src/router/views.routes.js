import express, { Router } from "express"
import {uploader} from '../dao/middlewares/multer.js'
import ProductManager from '../dao/db/ProductsManagerMongo.js'

const productManager = new ProductManager();
const router = express.Router()

router.get("/realTimeProducts",  async (req, res) => {
    res.render("realTimeProducts", {
        title: "Real Time Products",
        style: "home.css"
    })
})

router.get("/home", async (req, res) => {
    const allProducts =  await productManager.getProducts()
    res.render("home", {
        title: "Cards Products",
        style: "home.css",
        Products : allProducts
        //Products : {}

    })
})

// router.get("/chatView", async (req, res) => {
//     res.render("chat", {
//         title: "Chat",
//         style: "chat.css",
//         //Products : {}
//     })
// })

export default router
