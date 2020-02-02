import QueryContext from "./QueryContext";

export default abstract class <TData, TParams extends object, TResult> {
    public abstract run(context: QueryContext<TData>, params: TParams): TResult;
}