//Colours that a node can be
const colours = {
    Red: "RED",
    Black: "BLACK",
};

//We don't ever want to change this object
Object.freeze(colours);

module.exports = class RBNode {
    //Default attributes
    colour = colours.Black; 
    parent = null;
    left = null
    right = null;
    constructor(value) {
        this.value = value;
    }

    /*
        @param Value to be inserted    
    */
    insert(val) {
        //TODO: implement insertion        
    }

    /*
        @param Value to be deleted 
    */
    delete(val) {
        //TODO: implement deletion
    }

    /*
        @param Value to be found 
        @return The object representing that node or null if not found
    */
    find(val) {
        //TODO: implement find
        return null;
    }

    /* 
        @return Total number of nodes in the tree (all subnodes of this node)
    */
    size(){
        //TODO: implement size
        return 1;
    }

    /*
        @return The number of levels in the tree
    */
    depth(){
        //TODO: implement depth
        return 0;
    }

    /*        
        @return An array of all values in the tree left to right
    */
    flatten(){
        //TODO: implement flatten
        return [];
    }

    /*        
        @return An array of all nodes in the tree starting from center (so that reinserting would not require rotation, good for serilization)
    */
    collapse(){
        //TODO: implement collapse
        return [];
    }

    leftRotate(){
        //TODO: implement leftRotate
    }

    rightRotate(){
        //TODO: implement rightRotate
    }

}