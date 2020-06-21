let { RBTree, colours } = require("./rbtree.js");

let testTree;

beforeEach(() => {
	//Before every test instatiate tree to this
	testTree = new RBTree();
	testTree.insert(50);
});

describe("General input processing and exception handling tests:", () => {
	test("Non-integer inputs throw error", () => {
		//Check 2 data types for the manual tree
		expect(() => {
			testTree.insert("ABC");
		}).toThrow();
		expect(() => {
			testTree.delete("ABC");
		}).toThrow();
		expect(() => {
			testTree.find("ABC");
		}).toThrow();
		expect(() => {
			testTree.insert([1, 5, 7]);
		}).toThrow();
		expect(() => {
			testTree.delete([1, 5, 7]);
		}).toThrow();
		expect(() => {
			testTree.find([1, 5, 7]);
		}).toThrow();
	});
});

describe("Insert tests:", () => {
	beforeEach(() => {
		//Setup for tests in this describe block
		testTree.insert(25);
		testTree.insert(75);
	});
	describe("Binary tree properites:", () => {
		test("Insertion on an empty tree", () => {
			const blankTree = new RBTree();
			expect(blankTree.root).toBeNull();
			blankTree.insert(100);
			expect(blankTree.root).not.toBeNull();
			expect(blankTree.root.value).toEqual(100);
		});
		test("Unique element is inserted", () => {
			expect(testTree.root.left.value).toEqual(25);
			testTree.insert(15);
			expect(testTree.root.left.left.value).toEqual(15);
		});
		test("Duplicate elements are not inserted", () => {
			const preInsertTree = testTree;
			testTree.insert(50);

			expect(testTree).toEqual(preInsertTree);
		});
		test("Elements < root go in left subtree", () => {
			expect(testTree.root.left).not.toBeNull();
			expect(testTree.root.left.value).toEqual(25);
		});
		test("Elements > root go in right subtree", () => {
			expect(testTree.root.right).not.toBeNull();
			expect(testTree.root.right.value).toEqual(75);
		});
	});
	describe("Red black tree properites:", () => {
		test("root is always black", () => {
			expect(testTree.root.colour).toBe(colours.Red);
			testTree.insert(100);
			expect(testTree.root.colour).toBe(colours.Red);
			testTree.insert(35);
			expect(testTree.root.colour).toBe(colours.Red);
			testTree.insert(15);
			expect(testTree.root.colour).toBe(colours.Red);
			testTree.insert(10);
			expect(testTree.root.colour).toBe(colours.Red);
		});
		test("Case 1 is handled (parent & uncle are red)", () => {
			//colours should swap
		});
		test("Case 2 is handled (parent is red, uncle is black, inserted node's value is > parent's value)", () => {
			//should result in left rotation -> right rotation
		});
		test("Case 3 is handled (parent is red, uncle is black, inserted node's value is < parent's value)", () => {
			//should result in right rotation
		});
		test("Case 1 is checked up the tree", () => {
			//should result in right rotation
		});
	});
});

describe("Delete tests:", () => {
	describe("Binary tree properites:", () => {
		beforeEach(() => {
			//Setup for tests in this describe block
			testTree.insert(25);
			testTree.insert(75);
		});
		test("Existing element is deleted", () => {
			expect(testTree.root.left).not.toBeNull();
			testTree.delete(25);
			expect(testTree.root.left).toBeNull();
		});
		test("Deleting only element results in null root", () => {
			const singleNodeTree = new RBTree();
			singleNodeTree.insert(100);
			singleNodeTree.delete(100);
			expect(singleNodeTree.root).toBeNull();			
		});
		test("Calling delete on a null tree is handled", () => {
			const emptyTree = new RBTree();
			expect(() => {emptyTree.delete(100)}).not.toThrow();					
		});
		test("Deleting non-existant element hasd no effect", () => {
			const preDeleteTree = testTree;
			testTree.delete(10000);
			//toEqual checks all the properties are the same while toBe checks that objects ARE the same
			expect(testTree).toEqual(preDeleteTree);
		});
		test("Deleting element does not leave subtrees detatched", () => {
			testTree.insert(100);
			testTree.delete(75);
			expect(testTree.root.right).not.toBeNull();
			expect(testTree.root.right.value).toEqual(100);
		});
	});
	describe("Red black tree properites:", () => {
		beforeEach(() => {			
			testTree.insert(100);		
			testTree.insert(35);			
			testTree.insert(15);			
			testTree.insert(10);			
		});
		test("root is always black", () => {

		});
		test("Case 1 is handled (parent & uncle are red)", () => {

		});
		test("Case 2 is handled (parent is red, uncle is black, inserted node's value is > parent's value)", () => {
		
		});
		test("Case 3 is handled (parent is red, uncle is black, inserted node's value is < parent's value)", () => {
			
		});
		test("Case 1 is checked up the tree", () => {
			
		});
	});
});

describe("Size tests:", () => {
	test("Size of single node tree is 0", () => {
		const emptyTree = new RBTree();
		expect(emptyTree.size()).toEqual(0);
	});
	test("Size of single node tree is 1", () => {
		expect(testTree.size()).toEqual(1);
	});
	test("Adding nodes increases size appropriately", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.size()).toEqual(3);
	});
	test("Removing nodes decreases size appropriately", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.size()).toEqual(3);

		testTree.delete(25);
		expect(testTree.size()).toEqual(2);
		testTree.delete(75);
		expect(testTree.size()).toEqual(1);
	});
});

describe("Depth tests:", () => {
	test("Depth of empty tree is 0", () => {
		const emptyTree = new RBTree();
		expect(emptyTree.depth()).toEqual(0);;
	});
	test("Depth of single node tree is 1", () => {
		expect(testTree.depth()).toEqual(1);
	});
	test("Depth changes when nodes are removed (if it should)", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Depth is <= 2log2(n + 1)", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.depth()).toBeLessThanOrEqual(2*Math.log2(3 + 1));
		testTree.insert(100);		
		expect(testTree.depth()).toBeLessThanOrEqual(2*Math.log2(4 + 1));
		testTree.insert(35);
		expect(testTree.depth()).toBeLessThanOrEqual(2*Math.log2(5 + 1));			
		testTree.insert(15);			
		expect(testTree.depth()).toBeLessThanOrEqual(2*Math.log2(6 + 1));								
		testTree.insert(10);
		expect(testTree.depth()).toBeLessThanOrEqual(2*Math.log2(7 + 1));			
	});
});

describe("Find tests:", () => {
	test("Nodes in left subtree are returned", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Nodes in right subtree are returned", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Returns null for non-existant elements", () => {
		//TODO
		expect(true).toBe(true);
	});
});

describe("Flatten tests:", () => {
	test("Array length is always equal to tree size", () => {
		expect(testTree.flatten().length).toEqual(1);
		testTree.insert(25);
		expect(testTree.flatten().length).toEqual(2);
		testTree.insert(75);
		expect(testTree.flatten().length).toEqual(3);		
		testTree.insert(100);			
		expect(testTree.flatten().length).toEqual(4);
		testTree.insert(35);		
		expect(testTree.flatten().length).toEqual(5);
		testTree.insert(15);				
		expect(testTree.flatten().length).toEqual(6);
		testTree.insert(10);	
		expect(testTree.flatten().length).toEqual(7);	
	});
	test("Flattens appropriately", () => {		
		expect(testTree.flatten()).toEqual([50]);
		testTree.insert(25);
		expect(testTree.flatten()).toEqual([25, 50]);
		testTree.insert(75);
		expect(testTree.flatten()).toEqual([25, 50, 75]);		
		testTree.insert(100);	
		expect(testTree.flatten()).toEqual([25, 50, 75, 100]);
		testTree.insert(35);	
		expect(testTree.flatten()).toEqual([25, 35, 50, 75, 100]]);
		testTree.insert(15);		
		expect(testTree.flatten()).toEqual([15, 25, 35, 50, 75, 100]);
		testTree.insert(10);	
		expect(testTree.flatten()).toEqual([10, 15, 25, 35, 50, 75, 100]);			
	});
});

describe("Collapse tests:", () => {
	test("Array length is always equal to tree size", () => {
		expect(testTree.collapse().length).toEqual(1);
		testTree.insert(25);
		expect(testTree.collapse().length).toEqual(2);
		testTree.insert(75);		
		expect(testTree.collapse().length).toEqual(3);
		testTree.insert(100);				
		expect(testTree.collapse().length).toEqual(4);
		testTree.insert(35);		
		expect(testTree.collapse().length).toEqual(5);
		testTree.insert(15);					
		expect(testTree.collapse().length).toEqual(6);
		testTree.insert(10);
		expect(testTree.collapse().length).toEqual(7);
	});
	test("Collapses appropriately", () => {
		expect(testTree.collapse()).toEqual([50]);
		testTree.insert(25);
		expect(testTree.collapse()).toEqual([50, 25]);
		testTree.insert(75);	
		expect(testTree.collapse()).toEqual([50, 25, 75]);
		testTree.insert(100);		
		expect(testTree.collapse()).toEqual([50, 25, 75, 100]);
		testTree.insert(35);	
		expect(testTree.collapse()).toEqual([50, 25, 35, 75, 100]);
		testTree.insert(15);			
		expect(testTree.collapse()).toEqual([50, 25, 15, 35, 75, 100]);
		testTree.insert(10);
		expect(testTree.collapse()).toEqual([50, 25, 15, 10, 35, 75, 100]);
	});
});