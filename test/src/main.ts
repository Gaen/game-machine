import { expect } from 'chai';

import MachineFactory from "../../src/MachineFactory";
import SimpleTimeProvider from "../../src/time/SimpleTimeProvider";

describe('MachineFactory', () => {
    it('throws on invalid schema', () => {
        expect(() => new MachineFactory<any>(new SimpleTimeProvider(), {foo: 'bar'})).throws();
    });
});

describe('Queries', () => {

    type TData = {
        foo: string,
    };

    const schema = {
        "type": "object",
        "properties": {
            "foo": {
                "type": "string",
            }
        }
    };

    // type TQuery<TResult> = (context: QueryContext<TData>) => TResult;
    // const query: TQuery<Number> = (context) => context.time;

    const factory = new MachineFactory<TData>(new SimpleTimeProvider(), schema);

    it('can access time', () => {
        const machine = factory.create({});
        machine.query(context => context.time);
    });

    it('can access data', () => {
        const machine = factory.create({foo: 'bar'});
        const result = machine.query(context => context.mem.foo);
        expect(result).equal('bar');
    });

    it('throws on data modification', () => {
        const machine = factory.create({foo: 'bar'});
        expect(() => machine.query(context => context.mem.foo = 'baz')).throw();
        expect(machine.export().foo).equal('bar');
    });
});

describe('Commands', () => {

    type TData = {
        foo: string,
    };

    const schema = {
        "type": "object",
        "properties": {
            "foo": {
                "type": "string",
            }
        }
    };

    const factory = new MachineFactory<TData>(new SimpleTimeProvider(), schema);

    it('can modify data', () => {
        const machine = factory.create({foo: 'bar'});
        machine.execute(context => context.mem.foo = 'baz');
        expect(machine.export().foo).equal('baz');
    });

    it('protects from interface raping', () => {

        const factory = new MachineFactory<TData>(new SimpleTimeProvider(), schema);
        const machine = factory.create({myNumber: 1});

        expect(() => machine.execute(context => context.mem.foo = 'baz')).not.throw();
        expect(() => machine.execute(context => (context.mem.foo as any) = 1)).throw();
    });
});