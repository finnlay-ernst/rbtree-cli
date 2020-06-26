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
			expect(testTree.root.left.value).not.toBeNull();
			expect(testTree.root.left.value).toEqual(25);
		});
		test("Elements > root go in right subtree", () => {
			expect(testTree.root.right.value).not.toBeNull();
			expect(testTree.root.right.value).toEqual(75);
		});
	});
	describe("Red black tree properites:", () => {
		test("root is always black", () => {
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.insert(100);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.insert(35);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.insert(15);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.insert(10);
			expect(testTree.root.colour).toBe(colours.Black);
		});
		test("Case 1 is handled (parent & uncle are red)", () => {
			//colours should swap
			testTree.insert(25);
			testTree.insert(75);
			expect(testTree.root.left.colour).toBe(colours.Red);
			expect(testTree.root.right.colour).toBe(colours.Red);
			testTree.insert(35);
			expect(testTree.root.left.colour).toBe(colours.Black);
			expect(testTree.root.right.colour).toBe(colours.Black);
			expect(testTree.root.left.right.colour).toBe(colours.Red);
		});
		test("Case 2 is handled (parent is red, uncle is black, inserted node's value is > parent's value)", () => {
			//should result in left rotation -> right rotation
			testTree.insert(25);
			testTree.insert(75);
			testTree.insert(35);
			testTree.insert(15);
			testTree.insert(10);
			testTree.insert(12);
			expect(testTree.root.left.colour).toBe(colours.Red);
			expect(testTree.root.left.left.colour).toBe(colours.Black);
			expect(testTree.root.left.left.value).toEqual(12);
			expect(testTree.root.left.right.colour).toBe(colours.Black);
			expect(testTree.root.left.left.left.colour).toBe(colours.Red);
			expect(testTree.root.left.left.left.value).toEqual(10);
			expect(testTree.root.left.left.right.value).toEqual(15);
		});
		test("Case 3 is handled (parent is red, uncle is black, inserted node's value is < parent's value)", () => {
			//should result in right rotation
			testTree.insert(25);
			testTree.insert(75);
			testTree.insert(35);
			testTree.insert(15);
			testTree.insert(10);
			testTree.insert(5);
			expect(testTree.root.left.colour).toBe(colours.Red);
			expect(testTree.root.left.left.colour).toBe(colours.Black);
			expect(testTree.root.left.left.value).toEqual(10);
			expect(testTree.root.left.right.colour).toBe(colours.Black);
			expect(testTree.root.left.left.left.colour).toBe(colours.Red);
			expect(testTree.root.left.left.left.value).toEqual(5);
			expect(testTree.root.left.left.right.value).toEqual(15);
		});
		test("Cases are checked up the tree", () => {
			//inserting 5 results in a case 1,
			//fixing this case 1 results in a case 3 up the tree
			testTree.insert(25);
			testTree.insert(75);
			testTree.insert(35);
			testTree.insert(15);
			testTree.insert(10);
			testTree.insert(12);
			testTree.insert(5);
			expect(testTree.root.value).toEqual(25);
			expect(testTree.root.left.value).toEqual(12);
			expect(testTree.root.left.colour).toBe(colours.Red);
			expect(testTree.root.right.value).toEqual(50);
			expect(testTree.root.right.colour).toBe(colours.Red);
			expect(testTree.root.right.left.value).toEqual(35);
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
			expect(testTree.root.left.value).not.toBeNull();
			testTree.delete(25);
			expect(testTree.root.left.value).toBeNull();
		});
		test("Deleting only element results in null root", () => {
			const singleNodeTree = new RBTree();
			singleNodeTree.insert(100);
			singleNodeTree.delete(100);
			expect(singleNodeTree.root).toBeNull();
		});
		test("Calling delete on a null tree is handled", () => {
			const emptyTree = new RBTree();
			expect(() => {
				emptyTree.delete(100);
			}).not.toThrow();
		});
		test("Deleting non-existant element has no effect", () => {
			const preDeleteTree = testTree;
			testTree.delete(10000);
			//toEqual checks all the properties are the same while toBe checks that objects ARE the same
			expect(testTree).toEqual(preDeleteTree);
		});
		test("Deleting element does not leave subtrees detatched", () => {
			testTree.insert(100);
			testTree.delete(75);
			expect(testTree.root.right.value).not.toBeNull();
			expect(testTree.root.right.value).toEqual(100);
		});
		test("Deleting element with one subtree", () => {
			testTree.insert(15);
			testTree.delete(25);
			expect(testTree.root.left.value).toEqual(15);
			expect(testTree.root.left.parent.value).toEqual(50);
		});
		test("Deleting element with two subtrees", () => {
			testTree.insert(15);
			testTree.insert(35);
			testTree.delete(25);
			expect(testTree.root.left.value).toEqual(35);
			expect(testTree.root.left.parent.value).toEqual(50);
			expect(testTree.root.left.left.value).toEqual(15);
			expect(testTree.root.left.left.parent.value).toEqual(35);
		});
		test("Deleting element with no subtrees", () => {
			testTree.delete(25);
			expect(testTree.root.left.value).toBeNull();
		});
	});
	describe("Red black tree properites:", () => {
		beforeEach(() => {
			testTree.insert(25);
			testTree.insert(75);
			testTree.insert(100);
			testTree.insert(35);
			testTree.insert(15);
			testTree.insert(10);
			testTree.insert(12);
		});
		test("root is always black", () => {
			testTree.delete(25);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(75);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(100);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(35);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(15);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(10);
			expect(testTree.root.colour).toBe(colours.Black);
			testTree.delete(12);
			expect(testTree.root.colour).toBe(colours.Black);
		});
		test("Left child null is handled", () => {
			testTree.delete(10);
			testTree.delete(12);
			expect(testTree.root.left.left.value).toEqual(15);
			expect(testTree.root.left.left.colour).toBe(colours.Black);
		});
		test("Right child null is handled", () => {
			testTree.delete(15);
			testTree.delete(12);
			expect(testTree.root.left.left.value).toEqual(10);
			expect(testTree.root.left.left.colour).toBe(colours.Black);
		});
		test("Replacer node red handled", () => {
			testTree.delete(75);
			expect(testTree.root.right.value).toEqual(100);
			expect(testTree.root.right.colour).toBe(colours.Black);
		});
		test("Replacer node's replacer is black & has red sibling", () => {});
		test("Replacer node's replacer is black & has black sibling with two black childeren", () => {});
		test("Replacer node's replacer is black & has black sibling with red left child, black right child", () => {});
		test("Replacer node's replacer is black & has black sibling with red right child", () => {});
	});
});

describe("Size tests:", () => {
	test("Size of single node tree is 0", () => {
		const emptyTree = new RBTree();
		expect(emptyTree.size).toEqual(0);
	});
	test("Size of single node tree is 1", () => {
		expect(testTree.size).toEqual(1);
	});
	test("Adding nodes increases size appropriately", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.size).toEqual(3);
	});
	test("Removing nodes decreases size appropriately", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.size).toEqual(3);

		testTree.delete(25);
		expect(testTree.size).toEqual(2);
		testTree.delete(75);
		expect(testTree.size).toEqual(1);
	});
});

describe("Depth tests:", () => {
	test("Depth of empty tree is 0", () => {
		const emptyTree = new RBTree();
		expect(emptyTree.depth()).toEqual(0);
	});
	test("Depth of single node tree is 2", () => {
		expect(testTree.depth()).toEqual(2);
	});
	test("Depth changes when nodes are removed (if it should)", () => {
		testTree.insert(25);
		testTree.insert(75);
		testTree.insert(100);
		testTree.insert(35);
		testTree.insert(15);
		testTree.insert(10);

		expect(testTree.depth()).toEqual(5);
		testTree.delete(25);
		expect(testTree.depth()).toEqual(4);
		testTree.delete(50);
		expect(testTree.depth()).toEqual(4);
		testTree.delete(10);
		testTree.delete(100);
		expect(testTree.depth()).toEqual(3);
	});
	test("Depth is <= 2log2(n + 1)", () => {
		testTree.insert(25);
		testTree.insert(75);
		expect(testTree.depth()).toBeLessThanOrEqual(2 * Math.log2(3 + 1));
		testTree.insert(100);
		expect(testTree.depth()).toBeLessThanOrEqual(2 * Math.log2(4 + 1));
		testTree.insert(35);
		expect(testTree.depth()).toBeLessThanOrEqual(2 * Math.log2(5 + 1));
		testTree.insert(15);
		expect(testTree.depth()).toBeLessThanOrEqual(2 * Math.log2(6 + 1));
		testTree.insert(10);
		expect(testTree.depth()).toBeLessThanOrEqual(2 * Math.log2(7 + 1));
	});
});

describe("Find tests:", () => {
	beforeEach(() => {
		testTree.insert(25);
		testTree.insert(75);
		testTree.insert(100);
		testTree.insert(35);
		testTree.insert(15);
		testTree.insert(10);
	});
	test("Nodes in left subtree are returned", () => {
		expect(testTree.find(25)).toBeTruthy();
		expect(testTree.find(15)).toBeTruthy();
		expect(testTree.find(35)).toBeTruthy();
		expect(testTree.find(10)).toBeTruthy();
	});
	test("Nodes in right subtree are returned", () => {
		expect(testTree.find(75)).toBeTruthy();
		expect(testTree.find(100)).toBeTruthy();
	});
	test("Returns null for non-existant elements", () => {
		expect(testTree.find(750)).toBeNull();
		expect(testTree.find(0)).toBeNull();
		expect(testTree.find(-10)).toBeNull();
		expect(testTree.find(5)).toBeNull();
		expect(testTree.find(300)).toBeNull();
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