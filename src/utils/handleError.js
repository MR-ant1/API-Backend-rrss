export const handleError = (res, errorMessage, statusErrorCode = 500) => {
    res.staus(statusErrorCode).json({
        success: false,
        message: errorMessage
    })
}