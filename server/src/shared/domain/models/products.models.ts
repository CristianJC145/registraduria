/* eslint-disable max-classes-per-file */
export class ProductModel {
  id: number = null;

  images: string[] = null;

  name: string = null;

  stock: number = null;

  price: number = null;

  state: number = null;

  description: string = null;

  conditionId: number = null;

  productCategoryId : number = null;

  subcategoriesId : number[] = null;

  userId: number = null;
}

export class SubCategoryModel {
  id: number = null;

  name: string = null;
}
