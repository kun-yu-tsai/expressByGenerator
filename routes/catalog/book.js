var express = require('express');
var router = express.Router();

var book_controller = require('../controllers/bookController');

router.get('/', book_controller.index)

router.get('/books', book_controller.book_list)

router.get('/book/:id', book_controller.book_detail)

router.get('/book/create', book_controller.book_create_get)

router.post('/book/create', book_controller.book_create_post)

router.get('/book/delete', book_controller.book_delete_get)

router.post('/book/delete', book_controller.book_delete_post)

router.get('/book/update', book_controller.book_update_get)

router.post('/book/update', book_controller.book_update_post)