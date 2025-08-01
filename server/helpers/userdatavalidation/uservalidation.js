function userValidation({ data }) {
    try {
        // write methods for user data validation, make it dynamic and static both
    } catch (error) {
        console.error("❌ - Error validating user | userValidation", error);
        return {
            success: false,
            error: error.message
        }
    }
}