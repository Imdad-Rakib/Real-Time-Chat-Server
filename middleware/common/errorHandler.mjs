import createHttpError from "http-errors";

// 404 not found handler
function notFoundHandler(req, res, next) {
    next(createHttpError(404, 'Your requested content was not found!'))
}

// default error handler
function errorHandler(err, req, res, next){
    console.log(err);
    res.json({
        error: err
    })
}

export {notFoundHandler, errorHandler}