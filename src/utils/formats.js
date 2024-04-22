function response (status, data, errors) {
    return {
        status,
        data,
        errors
    }
}
module.exports = {
    response
}