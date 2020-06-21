let { RBTree } = require("./rbtree.js");

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
	describe("Binary tree properites:", () => {
		beforeEach(() => {
			//Setup for tests in this describe block
			testTree.insert(25);
			testTree.insert(75);
		});
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
		//TODO
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
		//TODO
	});
});

describe("Size tests:", () => {
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
	test("Depth of single node tree is 1", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Depth changes when nodes are removed (if it should)", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Depth is always 2log2(n + 1)", () => {
		//TODO
		expect(true).toBe(true);
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
		//TODO
		expect(true).toBe(true);
	});
	test("Flattens appropriately", () => {
		//TODO
		expect(true).toBe(true);
	});
});

describe("Collapse tests:", () => {
	test("Array length is always equal to tree size", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Collapses appropriately", () => {
		//TODO
		expect(true).toBe(true);
	});
});

describe("Rotation tests:", () => {
	//TODO: complete test list
	test("Calling rotate on node with no childeren has no effect", () => {
		//TODO
		expect(true).toBe(true);
	});
	describe("Left rotate tests:", () => {
		test("Right child is now parent", () => {
			//TODO
			expect(true).toBe(true);
		});
	});
	describe("Right rotate tests:", () => {
		test("Left child is now parent", () => {
			//TODO
			expect(true).toBe(true);
		});
	});
});

describe("Test red black properties:", () => {
	test("Root node is black in a single node tree", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Root node is black in a multi-node tree", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("Null leaves are black", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("All red nodes have black parents", () => {
		//TODO
		expect(true).toBe(true);
	});
	test("All paths to leaves have equivelent black node count", () => {
		//TODO
		expect(true).toBe(true);
	});
});
