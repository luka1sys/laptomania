const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true
    },
    cpu: {
        type: String,
        required: true
    },
    gpu: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    storage_type: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true

    },
    display_size: {
        type: String,
        required: true
    },
    resolution: {
        type: String,
        required: true

    },
    refresh_rate: {
        type: String,
        required: true
    },
    panel_type: {
        type: String,
        required: true
    },
    touchscreen: {
        type: Boolean,
        required: true
    },
    battery_capacity: {
        type: String,


    },
    charging_speed: {
        type: String,
    },
    battery_life: {
        type: String,
    },
    weight: {
        type: String,
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    stock: {
        type: Number,

    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    description: {
        type: String,

    }




});
const Laptop = mongoose.model('laptop', laptopSchema, 'laptops');
module.exports = Laptop;


