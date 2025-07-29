exports.logout = async (req, res) => {
    try {
        res.send('logout')
    } catch (error) {
        console.log(error)
    }
}