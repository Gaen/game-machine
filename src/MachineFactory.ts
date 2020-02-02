import Ajv from 'ajv';

import Machine from "./Machine";

export default class <TMemoryData>{

    private readonly _timeProvider: ITimeProvider;
    private readonly _validator: Ajv.ValidateFunction;

    constructor(timeProvider: ITimeProvider, schema: object) {

        this._timeProvider = timeProvider;

        const ajv = new Ajv({
            allErrors: true,
            verbose: true,
            strictKeywords: true,
        });

        try {
            this._validator = ajv.compile(schema);
        } catch (e) {
            throw new Error(`Invalid schema: ${e.message}`);
        }
    }

    public create(data: any): Machine<TMemoryData> {
        return new Machine(this._timeProvider, this._validator, data);
    }
}