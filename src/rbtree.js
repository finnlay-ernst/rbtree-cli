const chalk = require("chalk");

//Colours that a node can be
const colours = {
	Red: "RED",
	Black: "BLACK",
};

//We don't ever want to change this object
Object.freeze(colours);

//Constants relating to displaying tree in terminal
const spacerChar = ` `;
const padderChar = ` `;
const paddingSize = 4;


/*
    Class represening the nodes the tree will be made up of.
*/
class RBNode {
	//Default attributes for an inserted node
	colour = colours.Red;
	parent = null;

	constructor(value) {
		this.value = value;
		//If value is not null both childeren are leaf nodes else this node is a leaf node so both childeren are null
		if (value !== null) {
			this.left = this.right = leafNode();
			this.left.parent = this.right.parent = this;			
		}
		else{
			this.left = this.right = null;			
		}
	}

	/*
		Returns: The depth of the tree with this node as root (leaves included in depth)
	*/	
	depth(){
		let leftDepth = 0;
		let rightDepth = 0;
		if (this.left){
			leftDepth = this.left.depth();
		}
		if (this.right){
			rightDepth = this.right.depth();
		}
		return 1 + Math.max(leftDepth, rightDepth);
	}

	/*
		Parameters: An array with the collapsed tree so far
		Returns: Array with root first collapsed representation of the tree (values only)
	*/
	collapse(currentArray) {
		if (this.value === null) return [];
		currentArray.push(this.value);
		if (this.left.value !== null) currentArray.concat(this.left.collapse(currentArray));
		if (this.right.value !== null) currentArray.concat(this.right.collapse(currentArray));
		return currentArray;
	}

	/*
	flatten(currentArray) {
		if (this.value === null) return [];
		currentArray.push({value: this.value, colour: this.colour});
		if (this.left.value !== null) currentArray.concat(this.left.flatten(currentArray));
		if (this.right.value !== null) currentArray.concat(this.right.flatten(currentArray));
		return currentArray;
	}
	*/
	
	/*
		Parameters: displayString - Current array with each element being a new line to be displayed on the console
					width - Number of character spaces to be filled
					level - Which level of the tree (used to index array)
		Return: An array with each element being a new line to be displayed on the console
	*/
	display(displayString, width, level){						
		let spacerSize = Math.floor((width - paddingSize)/2);	
		if (spacerSize < 0) spacerSize = 0;
		
		if (displayString[level] === undefined) displayString[level] = ``;
		displayString[level] += spacerChar.repeat(spacerSize);
		if (this.value !== null){
			//When the value length is < padding size, try to put equal blank spaces on either side to pad out the value (and keep it centred)
			const valueLength = `${this.value}`.length;
			displayString[level] += padderChar.repeat(Math.floor((paddingSize - valueLength)/2)) + `${nodeToConsole(this.colour)(this.value)}` + padderChar.repeat(Math.ceil((paddingSize - valueLength)/2)); 
		}
		else{			
			displayString[level] += padderChar.repeat(paddingSize);
		}
		displayString[level] += spacerChar.repeat(spacerSize); 

		if (this.left) this.left.display(displayString, width/2, level+1);
		if (this.right) this.right.display(displayString, width/2, level+1);

		return displayString;
	}

	/*
		Returns: String representation of a node
	*/
	print() {
		return `Value: ${this.value}, Colour: ${this.colour}, Parent: ${this.parent.value}, Left: ${this.left}, Right: ${this.right}`;
	}
}

/*
	Parameters: A colour, either red or black
	Returns: The appropriate function from the chalk module for that colour
*/
let nodeToConsole = (nodeColour) => {
	return nodeColour === colours.Black ? chalk.bold.black : chalk.bold.red;
}

/*
	Returns: A node with value = null and colour = black (a leaf node)
*/
let leafNode = () => {
	let node = new RBNode(null);
	node.colour = colours.Black;
	return node;
}

/*
    Tree class for performing operations on the tree
*/
class RBTree {
	size = 0;
	constructor() {
		this.root = null;
	}

	/*
		Parameters: Value to be inserted 
    */
	insert(val) {
		if (isNaN(val))	throw 'Input not a number';
		if (this.root === null) {
			this.root = new RBNode(val);
			this.root.colour = colours.Black;
			this.size++;
		} else {
			let currentNode = this.root;
			while (currentNode.value !== null) {
				if (val > currentNode.value) {					
					if (currentNode.right.value) {
						currentNode = currentNode.right;
					} else {
						this.size++;
						currentNode.right = new RBNode(val);
						currentNode.right.parent = currentNode;
						//Finish insertion with currentNode pointing to the inserted node so fixup is easy
						currentNode = currentNode.right;
						break;
					}
				} else if (val < currentNode.value) {
					if (currentNode.left.value !== null) {
						currentNode = currentNode.left;
					} else {
						this.size++;
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
        Parameters: Value to be deleted 
    */
	delete(val) {
		if (isNaN(val))	throw 'Input not a number';	
		let deletee = this.find(val);
		let replacer;
		let replacersReplacer;
		let fixupCandidate;
		if (deletee === null) return null;
		this.size--;
		let needFixup = deletee.colour == colours.Black;
		if (deletee.left.value === null){
			fixupCandidate = deletee.right;
			this.relocate(deletee, deletee.right);
		}
		else if (deletee.right.value === null){
			fixupCandidate = deletee.left;
			this.relocate(deletee, deletee.left);
		}
		else {			
			//Both subtrees are non null
			replacer = this.min(deletee.right);
			needFixup = replacer.colour == colours.Black;
			fixupCandidate = replacersReplacer = replacer.right;
			if (replacer.p !== deletee){
				//Replace the replacer with its right child and ensure parent is updated
				this.relocate(replacer, replacersReplacer);	
				replacer.right = deletee.right;
				replacer.right.parent = replacer;	
			}
			this.relocate(deletee, replacer);
			replacer.left = deletee.left;
			replacer.left.parent = replacer;
			//Here a black node is potentially removed from the tree 			
			replacer.colour = deletee.colour;
		}
		if (needFixup) this.deleteFixup(fixupCandidate);
	}

	/*
        Parameters: Value to be found 
        Returns: The object representing that node or null if not found
    */
	find(val) {
		if (isNaN(val))	throw 'Input not a number';
		let currentNode = this.root;
		if (!currentNode){
			return null;
		}
		while (currentNode.value !== null) {
			if (val > currentNode.value) {
				currentNode = currentNode.right;
			} else if (val < currentNode.value) {
				currentNode = currentNode.left;
			} else {
				return currentNode;
			}
		}
		return null;
	}

	/*
		Returns: The number of levels in the tree (including leaves)
	*/
	depth() {
		return (this.root !== null) ? this.root.depth() : 0;
	}

	/*
		Parameters: The function used to display the elements 
	*/
	display(logFunction){
		if (this.root !== null){			
			this.root.display([], Math.pow(2, (this.depth())), 0).forEach((line, index) => {								
				logFunction(line);
			});
		}  
		else {
			logFunction("");
		}
	}

	/*        
		@return An array of all values in the tree left to right
	*/	
	/*
	flatten() {
		return this.root !== null ? this.root.flatten() : [];
	}	
	*/

	/*        
		Returns: An array of all nodes in the tree starting from root (so that reinserting would not require rotation, good for serilization)
	*/
	collapse() {
		return this.root !== null ? this.root.collapse([]) : [];
	}

	/*
		Returns: The minimum node in this subtree
	*/
	min(startingNode) {
		let currentNode = startingNode;
		while (currentNode.value !== null) {			
			if (currentNode.left.value !== null) currentNode = currentNode.left;
			else return currentNode;
		}
		return null;
	}

	/*
		Parameters: The node to begin the fixup routine on
	*/
	insertFixup(insertedNode) {
		//Start off with the node fixup was called with
		let currentNode = insertedNode;
		while (currentNode.parent.colour === colours.Red) {
			let parentIsLeft = currentNode.parent.parent.left === currentNode.parent;
			let uncle = parentIsLeft
				? currentNode.parent.parent.right
				: currentNode.parent.parent.left;			

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
					(parentIsLeft) ? this.leftRotate(currentNode) : this.rightRotate(currentNode);
				}
				//Case 3: uncle is black and line formed
				currentNode.parent.colour = colours.Black;
				currentNode.parent.parent.colour = colours.Red;
				(parentIsLeft) ? this.rightRotate(currentNode.parent.parent) : this.leftRotate(currentNode.parent.parent);
			}
		}
		this.root.colour = colours.Black;
	}

	/*
		Parameters: The node to begin the fixup routine on
	*/
	deleteFixup(replacerNode) {
		let currentNode = replacerNode;
		if (this.root.value === null) {
			this.root = null;
			return;
		}
		while (currentNode !== this.root && currentNode.colour === colours.Black){
			let isLeft = currentNode.parent.left == currentNode;					
			let sibling = (isLeft) ? currentNode.parent.right : currentNode.parent.left;
			if (sibling.colour === colours.Red){
				//Case 1: sibling is red
				sibling.colour = colours.Black;
				currentNode.parent.colour == colours.Red;
				(isLeft) ? this.leftRotate(currentNode.parent) : this.rightRotate(currentNode.parent);
				sibling = (isLeft) ? currentNode.parent.right : currentNode.parent.left;
			}
			if (sibling.value !== null){
				if (sibling.left.colour === colours.Black && sibling.right.colour === colours.Black){
					//Case 2: both of siblings children are black
					sibling.colour = colours.Red;
					currentNode = currentNode.parent;
				}
				else {
					if ((isLeft && sibling.right.colour === colours.Black) || (!isLeft && sibling.left.colour === colours.Black) ){
						//Case 3: only siblings right child is black
						(isLeft) ? sibling.left.colour = colours.Black : sibling.right.colour = colours.Black;
						sibling.colour = colours.Red;
						(isLeft) ? this.rightRotate(sibling) : this.leftRotate(sibling);
						sibling = (isLeft) ? currentNode.parent.right : currentNode.parent.left;
					}
					//Case 4: one or both of sibilings childeren are non black
					sibling.colour = currentNode.parent.colour;
					currentNode.parent.colour = colours.Black;
					(isLeft) ? sibling.right.colour = colours.Black : sibling.left.colour = colours.Black;
					(isLeft) ? this.leftRotate(currentNode.parent) : this.rightRotate(currentNode.parent);
					currentNode = this.root;
				}
			}
			else {
				//If the sibling is a null leaf the Case 4 is the only option
				sibling.colour = currentNode.parent.colour;
				currentNode.parent.colour = colours.Black;				
				(isLeft) ? this.leftRotate(currentNode.parent) : this.rightRotate(currentNode.parent);
				currentNode = this.root;
			}
						
		}
		currentNode.colour = colours.Black;
	}

	/*
		Parameters: target - The node to be replaced
					replacer - The node to replace the target		
	*/
	relocate(target, replacer){
		if (!target.parent){
			this.root = replacer; 
		}
		else if (target == target.parent.left){
			target.parent.left = replacer;
		}
		else {
			target.parent.right = replacer;
		}
		replacer.parent = target.parent;
	}

	/*
		Parameters: The node to rotate
	*/	
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

	/*
		Parameters: The node to rotate
	*/	
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
