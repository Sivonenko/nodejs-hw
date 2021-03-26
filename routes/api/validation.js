const Joi = require('joi')

const schemaAddContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().positive().min(4).max(10).required(),
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.number().integer().positive().min(4).max(10).optional(),
})

const validate = (schema, obj, next) => {
    const { error } = schema.validate(obj)
    if (error) {
        const [{ message }] = error.details
        return next({
            status: 400,
            message: `Filed: ${message.replace(/"/g, '')}`,
        })
    }
    next()
}

module.exports.addContact = (req, _res, next) => {
    return validate(schemaAddContact, req.body, next);
}

module.exports.updateContact = (req, _res, next) => {
    return validate(schemaUpdateContact, req.body, next)
}
