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
        @return true if object succesfully inserted else false (e.g. if object already in tree)
    */
    insert(val) {
        //TODO: implement insertion
        return false;
    }

    /*
        @param Value to be deleted 
        @return true if object succesfully removed else false (e.g. if object not in tree)
    */
    delete(val) {
        //TODO: implement deletion
        return false;
    }

    /*
        @param Value to be found 
        @return The object representing that node or null if not found
    */
    find(val) {
        return null;
    }

}