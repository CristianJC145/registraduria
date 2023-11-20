export interface GetRecordsByFieldRepository {
  run(field: string, table: string, row: string, id: number): Promise<any[]>;
}
