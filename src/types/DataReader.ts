export interface DataReader<T> {
    readData(): Promise<any>
}