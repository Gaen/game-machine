import CommandContext from "./CommandContext";

export default abstract class <TData, TParams extends object> {
    public abstract run(context: CommandContext<TData>, params: TParams): void;
}