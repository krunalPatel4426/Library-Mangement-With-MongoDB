const IssuedBook = require("../dtos/bookDto");
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
    const book = await bookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success : false,
            message: "No Book Found"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Book Found",
        data: book
    });
}

exports.getAllIssuedBook = async (req, res) => {
    const users = await userModel.find({
        issuedBook : {$exists : true}
    }).populate("issuedBook");

    const issuedBook = users.map((each) => new IssuedBook(each));

    if(issuedBook.length === 0){
        return res.status(404).json({
            success : false,
            message : "no book has been issued till now.."
        });
    }

    return res.status(200).json({
        success : true,
        message : "User with issued book",
        Data : issuedBook
    });
}

exports.addNewBook = async (req, res) => {
    const {data} = req.body;
    console.log(data)
    if(!data) {
        return res.status(404).json({
            success : false,
            message : "Data Not Found"
        });
    }

    await bookModel.create(data);
    const allBook = await bookModel.find();

    return res.status(200).json({
        success : true,
        message : "Book added Successfully",
        data : allBook
    });
};

exports.updateBook = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await bookModel.findOneAndUpdate({
            _id : id,
        },
        data,
        {
            new : true,
        }
    );
    return res.status(201).json({
        success : true,
        message : "book updated successfully",
        data : updatedBook
    });
};