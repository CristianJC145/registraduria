import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import ImageService from '../../../src/shared/services/imageUrl.service';

const productRouter = Router();

const basePathApi = '/api/products';
console.log("desde index ::::::::::::::::::::::.",ImageService.uploadImages)
productRouter.post(`${basePathApi}/create`, ImageService.uploadImages, CreateOrUpdateProduct);
productRouter.put(`${basePathApi}/edit/:id`, ImageService.uploadImages, CreateOrUpdateProduct);

export {
    productRouter,
};
