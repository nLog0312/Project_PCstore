const {StaffModal} = require('../model/model');

const staffController = {
    // Add staff here
    addStaff: async (req, res) => {
        try{
            const newStaff = new StaffModal(req.body);
            const savedStaff = await newStaff.save();
            res.status(200).json(savedStaff);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get all staff here
    getAllStaff: async (req, res) => {
        try{
            const staff = await StaffModal.find();
            res.status(200).json(staff);
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    // Get staff by id here
    getStaffById: async (req, res) => {
        try{
            const staff = await StaffModal.findById(req.params.id);
            res.status(200).json(staff);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
    // Delete staff by id here
    deleteStaffById: async (req, res) => {
        try {
            await StaffModal.findByIdAndDelete(req.params.id);
            res.status(200).json("Staff has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update staff by id here
    updateStaffById: async (req, res) => {
        try{
            const updatedStaff = await StaffModal.findById(req.params.id);
            await updatedStaff.updateOne({$set: req.body});
            res.status(200).json("Staff has been updated...");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
};

module.exports = staffController;