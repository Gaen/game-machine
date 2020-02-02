import Ajv from "ajv";

import QueryBase from "./query/QueryBase";
import QueryContext from "./query/QueryContext";
import CommandBase from "./command/CommandBase";
import CommandContext from "./command/CommandContext";
import Memory from "./memory/Memory";

export default class <TData>{

    private readonly _timeProvider: ITimeProvider;
    private readonly _memory: Memory<TData>;

    constructor(timeProvider: ITimeProvider, validator: Ajv.ValidateFunction, data: TData) {
        this._timeProvider = timeProvider;
        this._memory = new Memory<TData>(validator, data);
    }

    public execute<TParams extends object>(command: CommandBase<TData, TParams>, params: TParams): void {
        const context = new CommandContext<TData>(this._memory.data, this._timeProvider.getTime());
        command.run(context, params);
        this._memory.commit();
    }

    public query<TParams extends object, TResult>(query: QueryBase<TData, TParams, TResult>, params: TParams): TResult {
        const context = new QueryContext<TData>(this._memory.data, this._timeProvider.getTime());
        const result = query.run(context, params);
        this._memory.assertNotModified();
        return result;
    }

    public export(): TData {
        return this._memory.export();
    }
}