import { expect } from 'chai';

import hello from '../src/main';

describe('Dummy test', () => {
    it('should work', () => {
        expect(hello()).equal('hello world');
    });
});