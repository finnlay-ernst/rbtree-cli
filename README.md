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
Call insert fixup on grandparent.

#### Case 2 : Red parent, black uncle, right child (grandparent, parent and node make a triangle)
Call left rotate on parent, results in case 3.  
Call insert fixup on rotated node (was previously inserted nodes parent, is now its child), this fix case 3 that the left rotate caused.

#### Case 3 : Red parent, black uncle, left child (grandparent, parent and node make a line)
Call right rotate on grandparent.  

#### Case 4 : Recolour root
Here we have to ensure property 1 is maintained, recolour root node to black if it is red (this can happen when applying the fixes for the above cases).  

### Deletion Cases
If the node we replace the deleted node with is red there are no violations, but there are a number of ways the properties can be violated if the replacer node is black.  

Hence forth we will refer to the node to be deleted as the 'deletee' and the minimum node in the right tree of the 'deletee' as the 'replacer' node. We also need to keep track of a node that could cause violations which is will call 'problem'.  

#### Case 1 : Deletee has no left child 
Deletee will be replaced by the right subtree, deletee's parent should now point to deletee's right node instead of deletee. Deletee's right node should also update its parent to be deltee's parent.\
If deletee was black, call delete fixup on deletee's right node.  

#### Case 2 : Deletee has no right child (but has left child)
Deletee will be replaced by the left subtree, deletee's parent should now point to deletee's left node instead of deletee. Deletee's left node should also update its parent to be deltee's parent.\
If deletee was black, call delete fixup on deletee's left node.  

#### Case 3 : Deletee has left and right subtrees
Assign replacer to be the minimum node in deletee's right subtree. TBC  



## Supported Functionality
- Insert
- Delete
- Find
- Size (how many nodes?)
- Depth (how many levels?)
- Flatten (left to right)
- Collapse (root first)