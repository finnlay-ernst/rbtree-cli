const RBNode = require('./src/rbtree.js');
const inquirer = require('inquirer');

let root;

inquirer.prompt([
    {
        name: 'insertNum',
        message: "Enter a number to be inserted:"
    },
])
.then(answers => {
    (root) ? root.insert(answers.insertNum) : root = new RBNode(answers.insertNum)    
    if(root) {
        console.log(`Root value is ${root.value}`);
    }
    else {
        console.log(`Root not defined`);
    }    
})
.catch(error => {console.log(error)});

