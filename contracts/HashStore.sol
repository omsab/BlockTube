pragma solidity ^0.5.2;


contract HashStore {
        struct item
        {
        string path;
        string fileName;
        string title;
        string hash;
        uint index;
        }
        
    mapping(uint => item) itemList;
    address[] itemIndex;
    
    function getItemCount()public view returns(uint count) 
    {
        return itemIndex.length;
    }
    
    function addItem( string memory _path,string memory _fileName, string memory _title, string memory _hash) public
    {
        itemList[getItemCount()].path = _path;
        itemList[getItemCount()].fileName = _fileName;
        itemList[getItemCount()].title= _title;
        itemList[getItemCount()].hash = _hash;
        itemList[getItemCount()].index = itemIndex.push(msg.sender);
    }
    
    function getItem(uint index) public view returns(string memory path, string memory fileName, string memory title, string memory _hash)  
    {
    return(itemList[index].path,itemList[index].fileName,itemList[index].title, itemList[index].hash);
    }

}