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
    console.log("lelgo al home")
    const allProducts =  await productManager.getProducts()
    console.log("salio del al home")
    console.log(allProducts)


    res.render("home", {
        title: "Cards Products",
        style: "home.css",
        Products : allProducts

    })
})


export default router
