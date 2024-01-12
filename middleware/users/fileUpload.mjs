import uploader from "../../utilities/singleUploader.mjs";

function fileUpload(req, res, next) {
    const upload = uploader(
        "files",
        600000000,
    );
    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                error: err.msg
            });
        } else {
            next();
        }
    });
}

export default fileUpload;