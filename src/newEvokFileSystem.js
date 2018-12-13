import { readWriteFunctions } from '../src/readWriteFunctions.js'
//import { Elements } from '../storage.json'
picuri = "/sdfad.jpg"

var elementIndex = {}
var storageURI = '../storage.json'

const newEvokFileSystem = {}

//make a test: create JS obj, input properties and move/save it to .json, and viceversa
var UngaObj = {
    hello: 'world',
    hakuna: 'matata',
    favNumber: 6
}

var UngaJson = ''

newEvokFileSystem.onClickedUngaButton = () => {
    UngaJson = JSON.stringify(this.UngaObj)
    console.log(UngaJson)
}



/*
//create function that updateMemory(elementIndex)FromHDrive(storage.json) .
//.. this is called at the beginning to recover last state

updateElementIndexFromJson = () => {

    readWriteFunctions.getText(storageURI, (result) => {
        this.elementIndex = JSON.parse(result)
    })
}


// create function updateJsonFromElementIndexObj(elementIndexObj) ...
// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
startStorage()
{
    if (storageExists()) {
        updateElementIndexFromJson()
    }
    else {
        makeNewElementIndex()
    }
}

updateJsonFromElementIndexObj = () => {
    this.storageURI = JSON.stringify(this.elementIndex)
}

makeNewElementIndex()
{
    this.elementIndex = {
        elements: []
    }
}

addNewElement(elementName, type)
{
    let newElement = {
        name: elementName,
        type: type,
    }
    this.elementIndex.elements.push(newElement)
}

storageExists()
{
    return false
}

*/


export default newEvokFileSystem