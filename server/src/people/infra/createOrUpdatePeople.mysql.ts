import { CreateOrUpdatePeopleDto } from '../domain/dtos/createOrUpdatePeople.dto';
import { CreateOrUpdatePeopleRepository } from '../domain/repositories/createOrUpdatePeople.repository';
import { executeQuery } from '../../shared/infra/mysql/db.mysql';


export class CreateOrUpdatePeopleMySql implements CreateOrUpdatePeopleRepository {
  async run(data: CreateOrUpdatePeopleDto, id?: number) {
    let sql = '';
    let params: any[] = [];

    if (id) {
      sql =
        'UPDATE people SET name=?, idCard=?, email=?, phone=?, birthDate=? WHERE id = ?';
      params = [
        data.people.name,
        data.people.idCard,
        data.people.email,
        data.people.phone,
        data.people.birthDate,
        data.people.id,
      ];
    } else {
      sql =
        'INSERT INTO people (name, idCard, email, phone, birthDate) VALUES (?, ?, ?, ?, ?)';
      params = [
        data.people.name,
        data.people.idCard,
        data.people.email,
        data.people.phone,
        data.people.birthDate
      ];
    }

    return executeQuery(sql, params);
  }
}
