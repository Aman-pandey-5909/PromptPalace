const uuid = require('uuid')

function getDataFromRequest(req, options={withId: false, withTimestamp: false}) {
    const { withId, withTimestamp } = options

    const data = {
        ...req.body
    }

    if (Object.keys(data).length === 0) {
        throw new Error('No data provided, request body is empty')
    }

    if (withId) {
        data.id = uuid.v4()
    }

    if (withTimestamp) {
        const now = new Date().toISOString()
        data.createdAt = now
        data.updatedAt = now
    }

    return data

}

module.exports = getDataFromRequest