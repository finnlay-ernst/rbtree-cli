//Colours that a node can be
const colours = {
	Red: "RED",
	Black: "BLACK",
};

//We don't ever want to change this object
Object.freeze(colours);

/*
    Class represening the nodes the tree will be made up of.
*/
class RBNode {
	//Default attributes
	colour = colours.Red;
	parent = null;
	left = null;
	right = null;
	constructor(value) {
		this.value = value;
	}
}

/*
    Tree class for performing operations on the tree
*/
class RBTree {
	constructor() {
		this.root = null;
	}

	/*
		@param Value to be inserted 
    */
	insert(val) {
		if (this.root === null) {
			this.root = new RBNode(val);
			this.root.colour = colours.Black;
		} else {
			let currentNode = this.root;
			while (currentNode !== null) {
				if (val > currentNode.value) {
					//Take advantage of the fact that null is falsy
					if (currentNode.right) {
						currentNode = currentNode.right;
					} else {
						currentNode.right = new RBNode(val);
						currentNode.right.parent = currentNode;
						//Finish insertion with currentNode pointing to the inserted node so fixup is easy
						currentNode = currentNode.right;
						break;
					}
				} else if (val < currentNode.value) {
					if (currentNode.left) {
						currentNode = currentNode.left;
					} else {
						currentNode.left = new RBNode(val);
						currentNode.left.parent = currentNode;
						currentNode = currentNode.left;
						break;
					}
				} else {
					//Element already in tree
					return null;
				}
			}
			this.insertFixup(currentNode);
		}
	}

	/*
        @param Value to be deleted 
    */
	delete(val) {
		if (this.root !== null) this.root.delete(val);
		//TODO: implement deletion
	}

	/*
        @param Value to be found 
        @return The object representing that node or null if not found
    */
	find(val) {
		let currentNode = this.root;
		while (currentNode !== null) {
			if (val > currentNode.value) {
				currentNode = currentNode.right;
			} else if (val < currentNode.value) {
				currentNode = currentNode.left;
			} else {
				return currentNode;
			}
		}
		return currentNode;
	}

	/* 
		@return Total number of nodes in the tree 
	*/
	size() {
		return this.root !== null ? this.root.size() : 0;
	}

	/*
		@return The number of levels in the tree
	*/
	depth() {
		return this.root !== null ? this.root.depth() : 0;
	}

	/*        
		@return An array of all values in the tree left to right
	*/
	flatten() {
		return this.root !== null ? this.root.flatten() : [];
	}

	/*        
		@return An array of all nodes in the tree starting from root (so that reinserting would not require rotation, good for serilization)
	*/
	collapse() {
		return this.root !== null ? this.root.collapse() : [];
	}

	/*
		@return The minimum node in this subtree
	*/
	min() {
		let currentNode = this.root;
		while (currentNode !== null) {
			if (val > currentNode.value) {
				if (currentNode.right) currentNode = currentNode.right;
				else return null;
			} else if (val < currentNode.value) {
				if (currentNode.left) currentNode = currentNode.left;
				else return null;
			} else {
				return currentNode;
			}
		}
		return null;
	}

	insertFixup(insertedNode) {
		//Start off with the node fixup was called with
		let currentNode = insertedNode;
		while (currentNode.parent.colour === colours.Red) {
			let parentIsLeft = currentNode.parent.parent.left === currentNode.parent;
			let uncle = parentIsLeft
				? currentNode.parent.parent.right
				: currentNode.parent.parent.left;
			if (!uncle) {
				uncle = new RBNode(null);
				uncle.colour = colours.Black;
			}

			if (uncle.colour === colours.Red) {
				//Case 1: red uncle
				currentNode.parent.colour = colours.Black;
				uncle.colour = colours.Black;
				currentNode.parent.parent.colour = colours.Red;
				//Now we check cases again on the grandparent
				currentNode = currentNode.parent.parent;
				//No need to check cases on the root
				if (this.root.value == currentNode.value) break;
			} else {
				if (
					(parentIsLeft && currentNode.parent.right === currentNode) ||
					(!parentIsLeft && currentNode.parent.left === currentNode)
				) {
					//Case 2: uncle is black and triangle formed
					currentNode = currentNode.parent;
					this.leftRotate(currentNode);
				}
				//Case 3: uncle is black and line formed
				currentNode.parent.colour = colours.Black;
				currentNode.parent.parent.colour = colours.Red;
				this.rightRotate(currentNode.parent.parent);
			}
		}
		this.root.colour = colours.Black;
	}

	deleteFixup() {
		//TODO: implement the 4 cases for fixup
	}

	leftRotate(rotate) {
		let insert = rotate.right;
		rotate.right = insert.left;
		if (insert.left) {
			insert.left.parent = rotate;
		}
		insert.parent = rotate.parent;
		if (!rotate.parent) {
			//We were rotating the root
			this.root = insert;
		} else if (rotate.parent.left === rotate) {
			rotate.parent.left = insert;
		} else {
			rotate.parent.right = insert;
		}
		insert.left = rotate;
		rotate.parent = insert;
	}

	rightRotate(rotate) {
		let insert = rotate.left;
		rotate.left = insert.right;
		if (insert.right) {
			insert.right.parent = rotate;
		}
		insert.parent = rotate.parent;
		if (!rotate.parent) {
			//We were rotating the root
			this.root = insert;
		} else if (rotate.parent.left === rotate) {
			rotate.parent.left = insert;
		} else {
			rotate.parent.right = insert;
		}
		insert.right = rotate;
		rotate.parent = insert;
	}
}

module.exports = { RBNode, RBTree, colours };
