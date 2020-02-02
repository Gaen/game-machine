import { expect } from 'chai';

import MachineFactory from "../../src/MachineFactory";
import SimpleTimeProvider from "../../src/time/SimpleTimeProvider";

import TimeQuery from "../fixture/TimeQuery";
import FooQuery from "../fixture/FooQuery";
import ModifyFooCommand from "../fixture/ModifyFooCommand";
import ModifyFooQuery from "../fixture/ModifyFooQuery";

describe('MachineFactory', () => {
    it('throws on invalid schema', () => {
        expect(() => new MachineFactory<any>(new SimpleTimeProvider(), {foo: 'bar'})).throws();
    });
});

describe('Queries', () => {

    const factory = new MachineFactory<any>(new SimpleTimeProvider(), {});

    it('can access time', () => {
        const machine = factory.create({});
        machine.query(new TimeQuery(), {});
    });

    it('can access data', () => {
        const machine = factory.create({foo: 'bar'});
        const result = machine.query(new FooQuery(), {});
        expect(result).equal('bar');
    });

    it('throws on data modification', () => {
        const machine = factory.create({foo: 'bar'});
        expect(() => machine.query(new ModifyFooQuery(), {})).throw();
        expect(machine.export().foo).equal('bar');
    });
});

describe('Commands', () => {

    const factory = new MachineFactory<any>(new SimpleTimeProvider(), {});

    it('can modify data', () => {
        const machine = factory.create({foo: 'bar'});
        machine.execute(new ModifyFooCommand(), {newValue: 'baz'});
        expect(machine.export().foo).equal('baz');
    })
});