const {ProductModal} = require('../model/model');

const productController = {
    // Add product here
    addProduct: async (req, res) => {
        try{
            const newProduct = new ProductModal(req.body);
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get all products here
    getAllProducts: async (req, res) => {
        try{
            const products = await ProductModal.find();
            res.status(200).json(products);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get product by id here
    getProductById: async (req, res) => {
        try{
            const product = await ProductModal.findById(req.params.id);
            res.status(200).json(product);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Delete product by id here
    deleteProductById: async (req, res) => {
        try {
            await ProductModal.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update product by id here
    updateProductById: async (req, res) => {
        try{
            const updatedProduct = await ProductModal.findById(req.params.id);
            await updatedProduct.updateOne({$set: req.body});
            res.status(200).json("Product has been updated...");
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Update quantity by id here
    updateQuantityById: async (req, res) => {
        try{
            const updatedProduct = await ProductModal.findById(req.params.id);
            await updatedProduct.updateOne({$set: req.body});
            res.status(200).json("Product quantity has been updated...");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports = productController;