export interface ProductsDto {
    id? : number;
    images: File[];
    elementName: string ;
    idElementType: number ;
    material: string;
    color: string;
    model: string;
    serial : string;
    idCondition: number;
    idAvailability: number;
    idUser: number;
    dateCreation: string;
}