const Joi = require("@hapi/joi");

module.exports = {
    validateUserSchema(user, req) {
        const validUserSchema = {
            username: Joi.string()
                .max(10)
                .required(),
            name: Joi.string()
                .max(50)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .pattern(/^[a-z0-9](?!.*?[^\na-z0-9]{2}).*?[a-z0-9]$/im) // password has no blank space and special character at start and end but in between is allowed.
                .min(8)
                .max(16)
                .required()
                .error(new Error("Password should be between 8 to 16 characters, without space, and no special characters at start or end or consecutively.")),
            repeatPassword: Joi.any()
                .valid(Joi.ref("password"))
                .required()
                .error(new Error("Passwords must match")),
        };
        return Joi.object(validUserSchema).validate(user, validUserSchema);
    },
    validateRoomSchema(room, req) {
        const validRoomSchema = {
            name: Joi.string()
                .max(10)
                .required(),
        };
        return Joi.object(validRoomSchema).validate(room, validRoomSchema);
    },
    validateHomeSchema(home, req) {
        const validHomeSchema = {
            name: Joi.string()
                .max(20)
                .required(),
        };
        return Joi.object(validHomeSchema).validate(home, validHomeSchema);
    },
    validateDeviceSchema(device, req) {
        const validDeviceSchema = {
            name: Joi.string().required(),
            ip: Joi.string()
                .ip()
                .required(),
            deviceType: Joi.string().required(),
            state: Joi.string().valid("on", "off"),
            room: Joi.string()
                .min(24)
                .max(24)
                .error(new Error("Provide the room id where this device should be addded!")),
        };
        return Joi.object(validDeviceSchema).validate(device, validDeviceSchema, { abortEarly: false });
    },
};
