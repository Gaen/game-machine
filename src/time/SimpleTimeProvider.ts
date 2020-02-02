import './ITimeProvider';

export default class implements ITimeProvider {
    public getTime(): Number {
        return Date.now();
    }
}