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
newEvokFileSystem.startStorage = () => {
    if (storageExists()) {
        this.updateElementIndexFromJson()
    }
    else {
        this.makeNewElementIndex()
        console.log(elementIndex)
    }
}

updateElementIndexFromJson = () => {
    var fileUri = rootDirectory + storageURI
    readWrite.readText(fileUri, (result) => {
        elementIndex = JSON.parse(result)
        console.log("..elementIndex updated: " + JSON.stringify(elementIndex))
    })
}


//only called once when the app is first ever used
makeNewElementIndex = () => {
    elementIndex = {
        elements: [{ name: 'obj1', type: 'test' }]
    }
    console.log("..new elementIndex created: " + elementIndex)
    updateJsonFromElementIndexObj(elementIndex)
}



// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
updateJsonFromElementIndexObj = (currentElementIndex) => {
    var storageSTR = JSON.stringify(currentElementIndex)
    //console.log("..storageSTR: " + storageSTR)
    var fileUri = rootDirectory + storageURI

    readWrite.saveText(storageSTR, storageURI, () => {
        //console.log("..text saved " )
        readWrite.readText(fileUri, (result) => {
            console.log("..updated json as: " + result)
        })
    })
}

updateElementIndexFromNewElement = (newElement) => {
    elementIndex.elements.push(newElement)
    updateJsonFromElementIndexObj(elementIndex)
}


newEvokFileSystem.addNewElement = (elementName, type) => {
    let newElement = {
        name: elementName,
        type: type,
    }
    console.log("..new Element created: " + newElement.name)
    updateElementIndexFromNewElement(newElement)
}


storageExists = () => {
    return true
}



export default newEvokFileSystem