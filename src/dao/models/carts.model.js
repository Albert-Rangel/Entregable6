import mongoose, { mongo } from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    // products:[{
    //     id: {
    //         type: String,
    //         required: true,
    //     },
    //     quantity:{
    //         type: Number,
    //         required: true,
    //     }
    // }]
    products: [
        {
            pid: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export { cartsModel }