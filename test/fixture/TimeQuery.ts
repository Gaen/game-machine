import QueryBase from "../../src/query/QueryBase";
import QueryContext from "../../src/query/QueryContext";

type TimeQueryParams = {};

export default class extends QueryBase<any, TimeQueryParams, Number> {
    public run(context: QueryContext<any>, params: TimeQueryParams): Number {
        return context.time;
    }
}