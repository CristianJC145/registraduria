export interface GetRecordsByIdRepository {
  run(table: string, id: number): Promise<any[]>;
}
