const RBNode = require("./src/rbtree.js");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
});
const chalk = require("chalk");
const clear = require("clear");
const { RBTree, colours } = require("./src/rbtree.js");

clear();

let tree = new RBTree();
const log = console.log;

log(`Use ${chalk.blueBright("insert _")} or ${chalk.blueBright("delete _")} to modify tree\nUse ${chalk.blueBright("print")} to print out tree as an array\nInput should be a number\n`);
readline.prompt();
try {
	readline.on("line", (input) => {
		const inputs = input.toLowerCase().split(" ");		
		if (inputs.length > 2) {
			log("Error: Invalid input");
		}
		else if (isNaN(inputs[1]) && inputs.length === 2){	
		    throw 'Error: Input not a number'
		}

		switch (inputs[0]) {
			case "insert": {
				tree.insert(parseInt(inputs[1]));
				break;
			}
			case "delete": {
				tree.delete(parseInt(inputs[1]));
				break;
			}
			case "print": {
				log(`${tree.collapse()}`);
				break;
			}
			default:
				log("Error: Unrecognised command");
		}

		//TODO: Print out the tree		

		let currentNode = tree.root;
		let i = tree.size;
		if (currentNode !== null){
			while (currentNode.value !== null){
				log('	'.repeat(i) + '' + nodeToConsole(currentNode.colour)(currentNode.value) + '\n');
				currentNode = currentNode.left;
				i--;
			}	
		}
		readline.prompt();
	});
} catch (error) {
	console.error(error);
}
