import mongoose from "mongoose";

const productsCollection = "products";

const produtsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
        unique : true, 
        dropDups: true ,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
})

const productsModel= mongoose.model(productsCollection,produtsSchema);

export {productsModel}