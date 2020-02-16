const mongoose = require("mongoose");

const verifyID = objectID => {
    const { ObjectId } = mongoose.Types;
    if (!ObjectId.isValid(objectID)) return "The resource with given id doesn't exist!";
    return true;
};

module.exports.verifyID = verifyID;
