const RBNode = require('./src/rbtree.js');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});
const chalk = require('chalk');
const clear = require('clear');

clear();

let root;
const log = console.log;

log (`Use ${chalk.blueBright('insert _')} or ${chalk.blueBright('delete _')} to modify tree \nInput should be a number\n`);
readline.prompt(); 
try {
    readline.on ('line', (input) => {
        let inputs = input.toLowerCase().split(" ");
        if (inputs.length !== 2){
            log('Error: Invalid input');
        }
        // else if (isNaN(input[1])){
        //     throw 'Error: Input not a number'
        // }

        switch (inputs[0]){
            case 'insert': {
                (root) ? root.insert(inputs[1]) : root = new RBNode(inputs[1]);
                break;
            }
            case 'delete': {
                if (root){
                    root.delete(inputs[1]);
                }
                break;
            }
            default: log('Error: Unrecognised command');
        }

            
        //TODO: Print out the tree
        //Set the styling funtion approriately 
        if (root){
            let logStyling = (root.colour == "BLACK") ? chalk.bold.black : chalk.bold.red;
            log(logStyling(root.value));
        }
        readline.prompt(); 
    });     
} catch (error) {
    console.error(error);
}

