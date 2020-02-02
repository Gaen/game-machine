import QueryBase from "../../src/query/QueryBase";
import QueryContext from "../../src/query/QueryContext";

type ModifyFooQueryParams = {};

export default class extends QueryBase<any, ModifyFooQueryParams, Number> {
    public run(context: QueryContext<any>, params: ModifyFooQueryParams): Number {
        context.mem.foo = 'some new value';
        return context.mem.foo;
    }
}