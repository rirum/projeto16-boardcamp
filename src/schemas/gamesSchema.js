import joi from 'joi'

export const gamesSchema = joi.object({
    name: joi.string().required().min(3).trim(),
    image: joi.string().required().trim(),
    stockTotal: joi.number().greater(0).required(),
    pricePerDay: joi.number().greater().required(),
    // categoryId: joi.number().required()

})