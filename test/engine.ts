import { Comp1 } from './data/components';
import { Engine } from '../src/engine';
import assert from 'assert';
import recursiveData from './data/recursive'

describe('Engine', () => {
    var id = 'test@0.0.1';
    var data = { id, nodes: {} };

    var createValidEngine = () => {
        let eng = new Engine(id);

        eng.events['warn'] = [];
        eng.events['error'] = [];
        eng.register(new Comp1());
        return eng;
    };

    it('init', async () => {
        assert.doesNotThrow(createValidEngine, Error, 'valid');
        // assert.throws(() => {
        //     let eng = createValidEngine(); 

        //     eng.register({})
        // }, Error, 'object instead of component');
        assert.throws(() => new Engine('test@0.1'), Error, 'wrong id');
    });

    describe('process', async () => {
        it('data', async () => {
            assert.equal(await createValidEngine().process(data), 'success');
            assert.notEqual(await createValidEngine().process({ id: 'test@1.0.0', nodes: {} }), 'success', 'wrong id');
        });
    
        it('validation', async () => {
            assert.notEqual(await createValidEngine().process(recursiveData as any), 'success', 'recursive data');
        });    
    });
});