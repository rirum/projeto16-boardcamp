import joi from 'joi'

export const customerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().max(11).required(),
    cpf: joi.number().regex(/^[0-9]{11}$/).required(),
    birthday: joi.date().required(),
    

})