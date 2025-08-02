exports.verifysesh = async (req, res) => {
    try {
        console.log("Cookies: ", req.cookies);
        console.log("Reached Verification");
        return res.status(200).json({message: 'Session verified'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
}