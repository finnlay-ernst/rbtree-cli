const RBNode = require('./rbtree.js');


test ('Example test', () => {
    expect(1+2).toBe(3);
});

describe('General input processing and exception handling tests:', () => {
    test('Non-integer inputs throw error', () => {
        //TODO
        expect(true).toBe(true);
    }); 
});

describe('Insert tests:', () => {
    //TODO: complete test list
    describe('Binary tree properites:', () => {
        test('Unique element is inserted', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Duplicate elements are not inserted', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Elements < root go in left subtree', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Elements > root go in right subtree', () => {
            //TODO
            expect(true).toBe(true);
        });   
    });
    describe('Red black tree properites:', () => {
    
    });    
});

describe('Delete tests:', () => {
    //TODO: complete test list
    describe('Binary tree properites:', () => {
        test('Existing element is deleted', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Deleting only element throws error', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Deleting non-existant element hasd no effect', () => {
            //TODO
            expect(true).toBe(true);
        });
        test('Deleting element does not leave subtrees detatched', () => {
            //TODO
            expect(true).toBe(true);
        });        
    });
    describe('Red black tree properites:', () => {
    
    });    
});

describe('Size tests:', () => { 
    test('Size of single node tree is 1', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Adding nodes increases size appropriately', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Removing nodes decreases size appropriately', () => {
        //TODO
        expect(true).toBe(true);
    });
});

describe('Depth tests:', () => { 
    test('Depth of single node tree is 1', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Depth changes when nodes are removed (if it should)', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Depth is always 2log2(n + 1)', () => {
        //TODO
        expect(true).toBe(true);
    });
});

describe('Find tests:', () => {  
    test('Nodes in left subtree are returned', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Nodes in right subtree are returned', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Returns null for non-existant elements', () => {
        //TODO
        expect(true).toBe(true);
    });
});

describe('Flatten tests:', () => { 
    test('Array length is always equal to tree size', () => {
        //TODO
        expect(true).toBe(true);
    }); 
    test('Flattens appropriately', () => {
        //TODO
        expect(true).toBe(true);
    }); 
});

describe('Collapse tests:', () => {
    test('Array length is always equal to tree size', () => {
        //TODO
        expect(true).toBe(true);
    }); 
    test('Collapses appropriately', () => {
        //TODO
        expect(true).toBe(true);
    }); 
});

describe('Rotation tests:', () => {
    //TODO: complete test list
    test('Calling rotate on node with no childeren has no effect', () => {
        //TODO
        expect(true).toBe(true);
    }); 
    describe('Left rotate tests:', () => {
        test('Right child is now parent', () => {
            //TODO
            expect(true).toBe(true);
        }); 
    });
    describe('Right rotate tests:', () => {
        test('Left child is now parent', () => {
            //TODO
            expect(true).toBe(true);
        }); 
    });    
});

describe('Test red black properties:', () => {
    //TODO: complete test list    
});
