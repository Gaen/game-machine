import Ajv from "ajv";

import QueryContext from "./query/QueryContext";
import CommandContext from "./command/CommandContext";
import Memory from "./memory/Memory";

export default class <TData>{

    private readonly _timeProvider: ITimeProvider;
    private readonly _memory: Memory<TData>;

    constructor(timeProvider: ITimeProvider, validator: Ajv.ValidateFunction, data: TData) {
        this._timeProvider = timeProvider;
        this._memory = new Memory<TData>(validator, data);
    }

    public execute(fn: (context: CommandContext<TData>) => void): void {
        const context = new CommandContext<TData>(this._memory.data, this._timeProvider.getTime());
        fn(context);
        this._memory.commit();
    }

    public query<TResult>(fn: (context: QueryContext<TData>) => TResult): TResult {
        const context = new QueryContext<TData>(this._memory.data, this._timeProvider.getTime());
        const result = fn(context);
        this._memory.assertNotModified();
        return result;
    }

    public export(): TData {
        return this._memory.export();
    }
}