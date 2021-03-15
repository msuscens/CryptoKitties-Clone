pragma solidity 0.5.12;

library UtilsLibrary {
    
    function removeFrom(uint256[] storage array, uint256 value) public{
    // Finds and removes an integer value from an array (it doesn't maintain order of array elements) 
        for (uint256 i=0; i<array.length; i++){
            if (array[i] == value){
                array[i] = array[array.length-1];
                array.pop();
                break;
            }
        }
    }
}