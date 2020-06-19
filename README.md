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

[Red-Black Tree | Brilliant Math & Science Wiki](https://brilliant.org/wiki/red-black-tree/)

## Supported Functionality
- Insert
- Delete
- Find
- Size (how many nodes?)
- Depth (how many levels?)
- Flatten (left to right)
- Collapse (root first)