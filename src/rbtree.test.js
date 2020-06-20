const RBNode = require('./rbtree.js');


test ('Example test', () => {
    expect(1+2).toBe(3);
});

/*
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    @param min: integer minimum 
           max: integer maximum
    @return A random integer between min and max (including min but not max)
*/
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min; 
// }



// const randRoot = getRandomInt(50, 100);
// const randomTree = new RBNode(randRoot);


describe('General input processing and exception handling tests:', () => {
    test('Non-integer inputs throw error', () => {
        //Check 2 data types for the manual tree
        expect(() => {manualTree.insert('ABC')}).toThrow();
        expect(() => {manualTree.delete('ABC')}).toThrow();
        expect(() => {manualTree.find('ABC')}).toThrow();
        expect(() => {manualTree.insert([1, 5, 7])}).toThrow();
        expect(() => {manualTree.delete([1, 5, 7])}).toThrow();
        expect(() => {manualTree.find([1, 5, 7])}).toThrow();

        // //Check 2 data types for the random tree
        // expect(() => {randomTree.insert('ABC')}).toThrow();
        // expect(() => {randomTree.delete('ABC')}).toThrow();
        // expect(() => {randomTree.find('ABC')}).toThrow();
        // expect(() => {randomTree.insert([1, 5, 7])}).toThrow();
        // expect(() => {randomTree.delete([1, 5, 7])}).toThrow();
        // expect(() => {randomTree.find([1, 5, 7])}).toThrow();
    }); 
});

describe('Insert tests:', () => {
    const manualTree = new RBNode(50);
    describe('Binary tree properites:', () => {
        const prevSize = manualTree.size(); 
        manualTree.insert(25);        
        manualTree.insert(75);
        test('Unique element is inserted', () => {     
            const find25 = manualTree.find(25);   
            const find75 = manualTree.find(75);
            const newSize = manualTree.size();
            
            expect(find25).not.toBeNull();
            expect(find75).not.toBeNull();
            expect(newSize).toEqual(prevSize+2);
        });
        test('Duplicate elements are not inserted', () => {
            const preDupSize = manualTree.size(); 
            manualTree.insert(50);
            const postDupSize = manualTree.size();

            expect(postDupSize).toEqual(preDupSize);
        });
        test('Elements < root go in left subtree', () => {           
            expect(manualTree.left).not.toBeNull();
            expect(manualTree.left.value).toEqual(25);                
        });
        test('Elements > root go in right subtree', () => {        
            expect(manualTree.right).not.toBeNull();
            expect(manualTree.right.value).toEqual(75);                
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
    test('Root node is black in a single node tree', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Root node is black in a multi-node tree', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('Null leaves are black', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('All red nodes have black parents', () => {
        //TODO
        expect(true).toBe(true);
    });
    test('All paths to leaves have equivelent black node count', () => {
        //TODO
        expect(true).toBe(true);
    });
});
