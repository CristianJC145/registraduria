import { Response, NextFunction } from 'express';
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../resources/images'),
    filename: ( file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const ImageService = {
    uploadImages: (req, res: Response, next: NextFunction) => {
        try {
            // Verifica si hay archivos subidos en el middleware ImageService.uploadImages
            upload.array('imagenes', 5)(req, res, (err) => {
              if (err) {
                    console.error('Error in multer upload:', err);
                    return res.status(500).json({ error: err.message });
                }
                console.log('Files uploaded:::::::::::::::::::::::::::::::::', req.files);
                next();
            });
        } catch (error) {
            console.error('Error in ImageService.uploadImages:', error);
            res.status(500).json({ error: 'Internal server error' });
        } 
    },
};

export default ImageService;