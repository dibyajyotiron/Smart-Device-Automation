const mongoose = require("mongoose");

const verifyID = objectID => {
    const { ObjectId } = mongoose.Types;
    if (!ObjectId.isValid(objectID)) return "The resource you're looking for is not here anymore!";
    return true;
};

global.verifyID = verifyID;
