// const {bookModel, userModel} = require("../modals/index.js");
const userModel = require("../modals/userModal");
const IssuedBook = require("../dtos/bookDto");

exports.getAllUser = async (req, res) => {
    const user = await userModel.find();
    if(user.lenght === 0){
        return res.status(404).json({
            success : false,
            message : "user not found"
        });
    }

    return res.status(200).json({
        success : true,
        data : user
    });
};

exports.getUserById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User not found."
        });
    }

    return res.status(200).json({
        success : true,
        message : "User found",
        data : user
    });
};

exports.addNewUser = async (req, res) => {
    // console.log("Hello")
    const {name, surname, email, subscriptionType, subscriptionDate } = req.body.data;
    console.log(userModel); // Check if userModel is defined and has a create method
    console.log(typeof userModel.create); // Check if create is a function
    // console.log(name);
    await userModel.create({
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate 
    });
    const userData = await userModel.find();
    return res.status(200).json({
        success : true,
        message : "user added successfully",
        data : userData
    });
};

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data) {
        return res.status(404).json({
            success: false,
            message : "Data not found."
        });
    }

    const updatedUser = await userModel.findOneAndUpdate(
        {
            _id : id
        },
        {
            $set : {
                ...data
            }
        },
        {
            new : true
        }
    );

    return res.status(200).json({
        success : true,
        message : "User updated successfully",
        data: updatedUser
    });
};

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.deleteOne({_id : id});
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found"
        });
    }

    return res.status(200).json({
        success : true,
        message: "User deleted",
        data : user
    });
};

exports.getSubscriptionDetailsById = async (req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            success : false,
            message : "User not found."
        });
    }

    const getDays = (data = "") => {
        let date;
        if(data === ""){
            date = new Date();
        }else{
            date = new Date(data);
        }

        let days = Math.floor(date/(1000*24*60*60));
        return days;
    }

    const getSubscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date += 90;
        }else if(user.subscriptionType === "Standard"){
            date += 180;
        }else if(user.subscriptionType === "Premium"){
            date += 365;
        }

        return date;
    }

    let returnDate = getDays(user.returnDate);
    let currentDate = getDays();
    let subscriptionDate = getDays(user.subscriptionDate);
    let subscriptionExpiration = getSubscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionExpired : subscriptionExpiration < currentDate,
        daysLeftForExpiration : subscriptionExpiration < currentDate ? 0 : subscriptionExpiration-currentDate,
        fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 100
            : 50
          : 0,
    };

    return res.status(200).json({
        success : true,
        message : "Subscription detail for the user is: ",
        data
    });
}