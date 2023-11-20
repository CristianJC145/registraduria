import configureApi from "../../../shared/utils/axios"; 
import { services } from "../../../shared/constant/services";

export class GetSubCategoriesByProductService {
    run(subCategoriesByProduct: number) {
        return (configureApi().get(`${services.products}/sub-categories-product/${subCategoriesByProduct}`))
        .then((response) => response.data);
    }
}