import { Request, Response } from 'express';
import upload from '../shared/domain/services/multer.service';

const saveImagesToLocal = (req: Request, res: Response, next) => {
  const uploadMiddleware = upload.array('images', 5);

  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }

    const files = req.files as any[];

    req.body.images = files.map((file) => `/uploads/${file.newFilename}`);

    next();
  });
};

export {
  saveImagesToLocal,
};
