import configureApi from "../../../shared/utils/axios"; 
import { services } from "../../../shared/constant/services";

export class GetSubCategoriesByIdService {
    run(subCategoriesById: number) {
        return (configureApi().get(`${services.products}/sub-categories/${subCategoriesById}`))
        .then((response) => response.data);
    }
}