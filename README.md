# rbtree-cli
Description: A simple red black tree that the user can interact with via the command line
Languages: JavaScript

## Development Tasks

- [x]  Chose testing framework (Jest vs Mocha, etc)
- [x]  Find a good page documenting rules
- [x]  Setup project structure and Git
- [x]  Determine what functions to support (find, size, flatten, etc)
- [ ]  Implement function stubs & tests
    - [ ] Insert works
    - [ ] Delete works
    - [ ] Find works
    - [ ] Duplicate insertion
    - [ ] Deletion of a non-existant element
    - [ ] Test functions on null root
    - [ ] Left rotation works
    - [ ] Right rotation works
    - [ ] Approriate colour adjustments after rotation
    - [ ] Check properties (black root, black leaves, red node = black parent, all paths to leaves contain same black node count, max height 2log2(n+1))
    - [ ] Insert maintains red black tree properties 
    - [ ] Delete maintains red black tree properties
- [ ]  Implement functions
    - [ ] Insert
    - [ ] Delete
    - [ ] Find
    - [ ] Size
    - [ ] Depth
    - [ ] Flatten
    - [ ] Collapse

## Testing

We are going with Jest here as it is a more wholistic testing suite. Mocha is also good but requires us to find separate assertion libraries and whatnot. Jest is also built into React, so learning this testing framework will help when I move into learning React. 

## Rules/Pseudocode
Below I will synthesize knowledge I have gained from the following sources:
Introduction to Algorithms 3rd Edition (Pg 308 - 339) by Clifford Stein, Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest

[Red-Black Tree | Brilliant Math & Science Wiki](https://brilliant.org/wiki/red-black-tree/)

### Rules
1. Root node is always black
2. The null leaf nodes are always black
3. Red nodes must have 2 black childeren (thus red nodes cannot have red parents)
4. For any node in the tree, all paths to the leaves contain the same number of black nodes (have the same "black depth")

### Insertion Cases
Inserted nodes are red, if a inserted node's parent is red property 3 is violated, otherwise there is no issue.

#### Case 1 : Red parent, red uncle  
Colour parent and uncle black, colour grandparent red. 
Call fixup on grandparent.

#### Case 2 : Red parent, black uncle, right child (grandparent, parent and node make a triangle)
Call left rotate on parent, results in case 3.
Call fixup on rotated node (was previously inserted nodes parent, is now its child), this fix case 3 that the left rotate caused.

#### Case 3 : Red parent, black uncle, left child (grandparent, parent and node make a line)
Call right rotate on grandparent.

#### Case 4 : Recolour root
Here we have to ensure property 1 is maintained, recolour root node to black if it is red (this can happen when applying the fixes for the above cases).

### Deletion Cases

## Supported Functionality
- Insert
- Delete
- Find
- Size (how many nodes?)
- Depth (how many levels?)
- Flatten (left to right)
- Collapse (root first)