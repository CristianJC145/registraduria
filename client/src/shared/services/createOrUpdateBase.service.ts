import configureApi from '../utils/axios'
// import JsonToFormDataService from '../services/jsonToFormData.service'; // Importa el nuevo servicio

export class CreateOrUpdateBaseService<T extends Record<string, any>> {
  url = '';
  isFormData = false;

  async run(data: T, id?: number): Promise<void> {
    let newData: any = data;

    if (this.isFormData) {
    //   newData = JsonToFormDataService.convertJsonToFormData(data as Record<string, any>); // Utiliza el nuevo servicio
      console.log("new data", data);
    }

    if (id !== null && id !== undefined) {
      await this.update(newData, id);
    } else {
      await this.create(newData);
    }
  }

    private async create(data: any): Promise<void> {
        await configureApi().post(this.url, data);
    }

    private async update(data: any, id: number): Promise<void> {
        await configureApi().put(this.url + '/' + id, data);
    }   

}
