import { readWriteFunctions } from '../src/readWriteFunctions.js'
//import { Elements } from '../storage.json'
picuri = "/sdfad.jpg"

var elementIndex = {}
var storageURI = '../storage.json'

//create function that updateMemory(elementIndex)FromHDrive(storage.json) .
//.. this is called at the beginning to recover last state

updateElementIndexFromJson = () => {

    readWriteFunctions.getText(storageURI, (result)=>{
        this.elementIndex = result
    })
}


// create function updateJsonFromElementIndexObj(elementIndexObj) ...
// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
startStorage()
{
    if(storageExists())
    {
        updateElementIndexFromJson()
    }
    else{
        makeNewElementIndex()
    }
}

updateJsonFromElementIndexObj = () => {

}

makeNewElementIndex()
{
    this.elementIndex = {
        elements:[]
    }
}

addNewElement(elementName, type)
{
    let newElement = {
        name:elementName,
        type:type,
    }
    this.elementIndex.elements.push(newElement)
}

storageExists()
{
    return false
}