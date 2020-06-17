var async = require('async')
var Book = require('../models/book');
var BookInstance = require('../models/bookinstance')
var Author = require('../models/author')

exports.index = function (req, res) {
    async.parallel(
        {
            book_count: function (callback) {
                Book.countDocuments(callback)
                // in countDocuments(), it will execute "callback(null, counts)". This is kind of a heartful design from mongoose.
                // It takes care those tedious things for us.
            },
            book_instance_count: function (callback) {
                BookInstance.countDocuments(callback)
            },
            book_instance_available_count: function (callback) { // this is going to be an async function
                BookInstance.countDocuments({ status: 'Available' }, callback)
            },
            author_count: function (callback) {
                Author.countDocuments(callback)
            },

        },
        function (err, results) {
            res.render('index', { title: "TTTitle", data: results })
        }
    )
};

// Display list of all books.
exports.book_list = function (req, res, next) {
    Book.find({}, 'title author')
        .populate('author')
        .exec(function (err, list) {
            if (err) { return next(err) }
            res.render('book_list', { title: 'Book List', book_list: list })
        })
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};