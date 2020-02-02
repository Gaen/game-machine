import CommandBase from "../../src/command/CommandBase";
import CommandContext from "../../src/command/CommandContext";

type FooCommandParams = {newValue: any};

export default class extends CommandBase<any, FooCommandParams> {
    public run(context: CommandContext<any>, params: FooCommandParams): void {
        context.mem.foo = params.newValue;
    }
}