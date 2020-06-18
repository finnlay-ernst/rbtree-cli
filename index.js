const RBNode = require('./src/rbtree.js');
const inquirer = require('inquirer');
const chalk = require('chalk');

let root;
const log = console.log;
inquirer.prompt([
    {
        name: 'insertNum',
        message: "Enter a number to be inserted:",
    },
])
.then(answers => {
    if (isNaN(answers.insertNum)) {
        throw 'Entered value not a number.';
    }

    (root) ? root.insert(answers.insertNum) : root = new RBNode(answers.insertNum)    
    if(root) {
        log(`Root value is`);
        //Set the styling funtion approriately 
        let logStyling = (root.colour == "BLACK") ? chalk.bold.black : chalk.bold.red;
        log(logStyling(root.value)); 
    }
    else {
        log(`Root not defined`);
    }        
})
.catch(error => {console.error(error)});
