import {ITimeProvider} from "./ITimeProvider";

export class SimpleTimeProvider implements ITimeProvider {
    public getTime(): Number {
        return Date.now();
    }
}