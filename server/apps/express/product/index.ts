import { Router } from 'express';
import { CreateOrUpdateProduct } from './createOrUpdateProduct';
import { GetAllProducts } from './getAllProducts';
import { GetAllCategories } from './getAllCategories';
import { GetProductsWithPagination } from './getProductsWithPagination';
import { GetProductConditions } from './getProductConditions';
import { GetSubCategoriesById } from './getSubCategoriesById';
import { GetProductById } from './getProductById';
import { GetSubcategoriesByProduct } from './getSubcategoriesByProduct';

import upload from '../../../src/shared/domain/services/multer.service';

const productRouter = Router();

const basePathApi = '/api/products';

productRouter.get(`${basePathApi}`, GetAllProducts);
productRouter.get(`${basePathApi}/list`, GetProductsWithPagination);
productRouter.get(`${basePathApi}/categories`, GetAllCategories);
productRouter.get(`${basePathApi}/sub-categories/:id`, GetSubCategoriesById);
productRouter.get(`${basePathApi}/sub-categories-product/:id`, GetSubcategoriesByProduct);
productRouter.get(`${basePathApi}/conditions`, GetProductConditions);
productRouter.get(`${basePathApi}/product/:id`, GetProductById);

productRouter.post(`${basePathApi}/product`, upload.array('images', 5), CreateOrUpdateProduct);
productRouter.put(`${basePathApi}/product/:id`, upload.array('images', 5), CreateOrUpdateProduct);

export {
  productRouter,
};
