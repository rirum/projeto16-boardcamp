import joi from 'joi'

export const customerSchema = joi.object({
    name: joi.string().required().min(3).trim(),
    phone: joi.string().required().max(11).trim(),
    cpf: joi.number().min(11).max(11).required(),
    birthday: joi.date().required(),
    

})