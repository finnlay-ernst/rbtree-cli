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
		if (this.root === null) this.root = new RBNode(val);
		else this.root.insert(val);
		//TODO: implement insertion
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
		//TODO: ensure val is valid input
		return this.root !== null ? this.root.find(val) : null;
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
	min(){
		//TODO: implement min
	}

	insertFixup(){
		//TODO: implement the 3 cases for fixup
	}

	deleteFixup(){
		//TODO: implement the 4 cases for fixup
	}

	leftRotate() {
		//TODO: implement leftRotate
	}

	rightRotate() {
		//TODO: implement rightRotate
	}
}

module.exports = { RBNode, RBTree, colours };
