const joi = require("joi")

const profileSchema = joi.object({
    displayName:joi.string().required(),
    title
})