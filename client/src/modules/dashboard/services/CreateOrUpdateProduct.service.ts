import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';
import { ProductsDto } from '../dtos/product.dto'

export class CreateOrUpdateProductService extends CreateOrUpdateBaseService<ProductsDto> {
    url = `${services.products}/create`;
    isFormData = true;
}