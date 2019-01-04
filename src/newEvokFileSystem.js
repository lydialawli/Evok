import readWrite from '../src/readWrite.js'
import { FileSystem } from 'expo'

//import { Elements } from '../storage.json'

var elements = []
var elementIndex = {}
var storageURI = 'storage.json'
var rootDirectory = FileSystem.documentDirectory

const newEvokFileSystem = {}

//create function that updateMemory(elementIndex)FromHDrive(storage.json) .
//.. this is called at the beginning to recover last state
newEvokFileSystem.startStorage = (callback) => {
    if (storageExists()) {
        //console.log("this is callback: " + callback)
        this.updateElementIndexFromJson(callback)
    }
    else {
        this.makeNewElementIndex(callback)
    }
}

updateElementIndexFromJson = (callback) => {
    var fileUri = rootDirectory + storageURI
    readWrite.readText(fileUri, (result) => {
        elementIndex = JSON.parse(result)
        //console.log("..elementIndex updated: " + JSON.stringify(elementIndex))
        callback()
    })
}

newEvokFileSystem.getArrayOfElements = () => {
    return elementIndex.elements
}


//only called once when the app is first ever used:
makeNewElementIndex = (callback) => {
    elementIndex = {
        elements: [{ name: 'obj1', type: 'test' }]
    }
    console.log("..new elementIndex created: " + elementIndex)
    updateJsonFromElementIndexObj(elementIndex, callback)
}



// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
updateJsonFromElementIndexObj = (currentElementIndex, callback) => {
    var storageSTR = JSON.stringify(currentElementIndex)
    //console.log("..storageSTR: " + storageSTR)
    var fileUri = rootDirectory + storageURI

    readWrite.saveText(storageSTR, storageURI, () => {
        //console.log("..text saved " )
        readWrite.readText(fileUri, (result) => {
            console.log("..updated json as: " + result)
            callback()
        })
    })
}

updateElementIndexFromNewElement = (newElement, callback) => {
    elementIndex.elements.push(newElement)
    updateJsonFromElementIndexObj(elementIndex, callback)
}

newEvokFileSystem.updateElementIndexFromDeletedElement = (elementToDelete, callback) => {
    elementIndex.elements.pop(elementToDelete)
    updateJsonFromElementIndexObj(elementIndex, callback)
}



newEvokFileSystem.addNewElement = (elementName, timeOfCreation, type, callback) => {
    let newElement = {
        name: elementName,
        id: timeOfCreation,
        type: type,
        imageHistory: []
    }
    console.log("..new Element created: " + elementName)
    updateElementIndexFromNewElement(newElement, callback)
}


storageExists = () => {
    return true
}



export default newEvokFileSystem