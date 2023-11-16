export interface GetAllRecordsRepository {
  run(table: string): Promise<any[]>;
}
