exports.verifysesh = async (req, res) => {
    try {
        return res.status(200).json({message: 'Session verified'})
    } catch (error) {
        console.log(error)
    }
}