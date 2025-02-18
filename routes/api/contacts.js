const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const validate = require('./validation')

router.get('/', async (_req, res, next) => {
    try {
        const contacts = await Contacts.listContacts();
        return res.json({
            status: 'success',
            code: 200,
            data: contacts,
        })
    } catch (e) {
        next(e)
    }
})


router.get('/:contactId', async (req, res, next) => {
    try {
        const contact = await Contacts.getContactById(req.params.contactId)

        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
})


router.post('/', validate.addContact, async (req, res, next) => {
    try {
        const contact = await Contacts.addContact(req.body)
        return res.status(201).json({
            status: 'success',
            code: 201,
            data: contact,
        })
    } catch (e) {
        next(e)
    }
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
    try {
        const contact = await Contacts.updateContact(
            req.params.contactId,
            req.body,
        )

        if (!req.body) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'missing fields',
            })
        }

        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
})

router.delete('/:contactId', async (req, res, next) => {
    try {
        const contact = await Contacts.removeContact(req.params.contactId)
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: contact,
                message: 'contact deleted',
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not Found',
            })
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router
