const express = require('express');
const laptoprouter = express.Router();

const { addLaptop, getLaptops, updateLaptop, deleteLaptop, getLaptop } = require('../controllers/laptop.controller');
const upload = require('../config/multer');
const { protect } = require('../middlewares/auth.middleware');
const restrictTo = require('../middlewares/roles.middleware');

laptoprouter.post('/', upload.array('images', 4), protect, restrictTo('admin','moderator'), addLaptop);
laptoprouter.get('/', getLaptops);
laptoprouter.patch('/:id', protect, restrictTo('admin','moderator'),  upload.array('images', 4), updateLaptop);
laptoprouter.delete('/:id', protect, restrictTo('admin','moderator'), deleteLaptop);
laptoprouter.get('/:id', getLaptop);

module.exports = laptoprouter;
