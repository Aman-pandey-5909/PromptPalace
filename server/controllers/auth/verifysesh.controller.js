const asyncHandler = require('../../utils/asyncHandler')

exports.verifysesh = asyncHandler(async (req, res) => {
        console.log("Reached Verification");
        return res.status(200).json({message: 'Session verified'})
} )