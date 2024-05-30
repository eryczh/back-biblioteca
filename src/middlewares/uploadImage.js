import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/roupa')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname)  
    }
});

const fileFilter = (req, file, cb) => {
    const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

    if(extensaoImg){
        return cb(null, true);
    }

    return cb(null, false);
};

const upload = multer({ storage, fileFilter });

export default upload;
