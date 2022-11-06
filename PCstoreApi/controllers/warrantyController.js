const {CustomerModal, StaffModal, ProductModal, WarrantyModal} = require('../model/model');

const warrantyController = {
    // Add warranty here
    addWarranty: async (req, res) => {
        try{
            const newWarranty = new WarrantyModal(req.body);
            const savedWarranty = await newWarranty.save();
            if (req.body.customer) {
                const customer = CustomerModal.find({_id: req.body.customer});
                await customer.updateOne({$push: {warranty: savedWarranty._id}});
            }
            res.status(200).json(savedWarranty);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get all warranties here
    getAllWarranties: async (req, res) => {
        try{
            const warranties = await WarrantyModal.find().populate('customer').populate('staff').populate('product');
            res.status(200).json(warranties);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get warranty by id here
    getWarrantyById: async (req, res) => {
        try{
            const warranty = await WarrantyModal.findById(req.params.id).populate('customer').populate('staff').populate('product');
            res.status(200).json(warranty);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = warrantyController;