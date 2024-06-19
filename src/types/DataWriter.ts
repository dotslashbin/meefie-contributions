export interface DataWriter {
    saveData(data: any): Promise<any>
}