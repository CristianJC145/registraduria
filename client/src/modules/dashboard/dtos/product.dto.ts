export interface ProductsDto {
    id? : number;
    images: File[];
    name: string ;
    stock: number ;
    price: number;
    state: number;
    description: string;
    productCategoryId : number;
    subcategoryId: number[];
    userId: number
    conditionId: number;
}

export interface CategoriesDto {
    id: number;
    name: string;
}