const {CustomerModal, WarrantyModal} = require('../model/model');

const customerController = {
    // Add customer here
    addCustomer: async (req, res) => {
        try{
            const newCustomer = new CustomerModal(req.body);
            const savedCustomer = await newCustomer.save();
            res.status(200).json(savedCustomer);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get all customers here
    getAllCustomers: async (req, res) => {
        try{
            const customers = await CustomerModal.find();
            res.status(200).json(customers);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get customer by id here
    getCustomerById: async (req, res) => {
        try{
            const customer = await CustomerModal.findById(req.params.id);
            res.status(200).json(customer);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Delete customer by id here
    deleteCustomerById: async (req, res) => {
        try {
            await WarrantyModal.findOneAndDelete(
                {customer: req.params.id}
            );
            await CustomerModal.findByIdAndDelete(req.params.id);
            res.status(200).json("Customer has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update customer by id here
    updateCustomerById: async (req, res) => {
        try{
            const updatedCustomer = await CustomerModal.findById(req.params.id);
            await updatedCustomer.updateOne({$set: req.body});
            res.status(200).json("Customer has been updated...");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = customerController;