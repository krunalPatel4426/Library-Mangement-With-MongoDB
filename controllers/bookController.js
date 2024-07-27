const {bookModel, userModel} = require("../modals/index");

exports.getAllBooks = async (req, res) => {
    const books = await bookModel.find();

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            message: "No Book Found"
        });
    }

    return res.status(200).json({
        success: true,
        data: books
    });
}

exports.getBookById = async (req, res) => {
    const {id} = req.params;
    const book = bookModel.findById(id);
    if(book === 0){
        return res.status(404).json({
            success : false,
            message: "No Book Found"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found",
        data: books
    });
}