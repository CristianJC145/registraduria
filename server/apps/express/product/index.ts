import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import upload from '../../../src/shared/domain/services/multer.service';
import { GetAllProducts } from './getAllProducts';
import { GetAllCategories } from './getAllCategories';
import { GetProductsWithPagination } from './getProductsWithPagination';
import { GetProductConditions } from './getProductConditions';

const productRouter = Router();

const basePathApi = '/api/products';

productRouter.get(`${basePathApi}`, GetAllProducts);
productRouter.get(`${basePathApi}/list`, GetProductsWithPagination);
productRouter.get(`${basePathApi}/categories`, GetAllCategories);
productRouter.get(`${basePathApi}/conditions`, GetProductConditions);

productRouter.post(`${basePathApi}/create`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.put(`${basePathApi}/edit/:id`, upload.array('images', 5), CreateOrUpdateProduct);

export {
  productRouter,
};
