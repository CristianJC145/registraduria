export interface ProductsDto{
    id? : number;
    images: number;
    name: string ;
    stock: number ;
    price: number;
    state: number;
    description: string;
    product_category_id : number;
    condition_id: number;
}

export interface CategoriesDto {
    id: number;
    name: string;
}