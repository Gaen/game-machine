import _ from "lodash";
import Ajv from "ajv";

export default class <TData> {

    private readonly _validator: Ajv.ValidateFunction;

    private _data: TData;
    private _pendingData: TData;

    constructor(validator: Ajv.ValidateFunction, data: TData) {
        this._validator = validator;
        this.validate(data);
        this._data = data;
        this._pendingData = _.cloneDeep(this._data);
    }

    public get data(): TData {
        return this._pendingData;
    }

    public export(): TData {
        return _.cloneDeep(this._data);
    }

    public commit(): void {
        this.validate(this._pendingData);
        this._data = this._pendingData;
        this._pendingData = _.cloneDeep(this._data);
    }

    public assertNotModified(): void {
        if(!_.isEqual(this._data, this._pendingData))
            throw new Error('Data modified since last commit');
    }

    private validate(data: TData): void {

        const result = this._validator(data);

        if(!result)
            throw new Error('Validation failed');
    }
}