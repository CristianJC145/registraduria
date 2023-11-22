export interface DeleteRecordsByIdRepository {
  run(table: string, field : string, id: number,): Promise<any[]>;
}
