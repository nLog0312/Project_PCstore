const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    warranty: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Warranty'
        }
    ]
});

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    quantityBegin: {
        type: Number,
        required: true
    }
});

const warrantySchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    product: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number
            },
            end: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

let CustomerModal = mongoose.model('Customer', customerSchema);
let StaffModal = mongoose.model('Staff', staffSchema);
let ProductModal = mongoose.model('Product', productSchema);
let WarrantyModal = mongoose.model('Warranty', warrantySchema);

module.exports = { CustomerModal, StaffModal, ProductModal, WarrantyModal };