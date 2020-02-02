import QueryBase from "../../src/query/QueryBase";
import QueryContext from "../../src/query/QueryContext";

type FooQueryParams = {};

export default class extends QueryBase<any, FooQueryParams, Number> {
    public run(context: QueryContext<any>, params: FooQueryParams): Number {
        return context.mem.foo;
    }
}