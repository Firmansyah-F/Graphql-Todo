const { verifyJwt } = require("./authJwt")

const isLoggedIn = (token) => {
    const result = verifyJwt(token)
    return {
        loggedIn : true,
        user : result
    }
}

module.exports = {
    isLoggedIn
}