const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler).catch((error)=> next(error))
    }
}

export { asyncHandler }




// const asyncHandler = () => {}
// const asyncHandler = (func) => { () => {} }
// const asyncHandler = (func) => () => {}


// const asyncHandler = (func) => async (req, res, next) => {
//     try {
//         await func(req, res, next)
//     } catch (error) {
//         res.status(error.code).json({
//             success: false,
//             message: error.message
//         })
//     }
// }








