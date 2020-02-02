export default class <TData> {

    public readonly mem: TData;
    public readonly time: Number;

    constructor(data: TData, time: Number) {
        this.mem = data;
        this.time = time;
    }
}