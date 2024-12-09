import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import { GetAllProducts } from './getAllProducts';
import { GetProductsWithPagination } from './getProductsWithPagination';
import { GetProductConditions } from './getProductConditions';

import upload from '../../../src/shared/domain/services/multer.service';
import { GetAllElementType } from './getAllElementTypes';
import { GetElementById } from './getElementById';
import { DeleteElementById } from './deleteElementById';

const productRouter = Router();

const basePathApi = '/api/products';

productRouter.get(`${basePathApi}`, GetAllProducts);
productRouter.get(`${basePathApi}/list`, GetProductsWithPagination);
productRouter.get(`${basePathApi}/element-types`, GetAllElementType);
productRouter.get(`${basePathApi}/conditions`, GetProductConditions);
productRouter.get(`${basePathApi}/element/:id`, GetElementById);

productRouter.post(`${basePathApi}/element`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.put(`${basePathApi}/element/:id`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.delete(`${basePathApi}/element/:id`, DeleteElementById);

export {
  productRouter,
};
