import readWriteFunctions from '../src/readWriteFunctions.js'
import { FileSystem } from 'expo'
import evokFileSystem from '../src/evokFilesystem.js'

//import { Elements } from '../storage.json'


var elementIndex = {}
var storageURI = 'storage.json'
var rootDirectory = FileSystem.documentDirectory

const newEvokFileSystem = {}

//make a test: create JS obj, input properties and move/save it to .json, and viceversa

var UngaIndex = {
}

var UngaJson = ''



newEvokFileSystem.onClickedUngaButton = (value) => {
    updateUngaIndexToJson(value)
    console.log(UngaJson)
}

updateUngaIndexToJson = (value) => {
    UngaJson = JSON.stringify(value)
}

updateUngaIndexFromJUngaJson = (value) => {
    value = JSON.parse(UngaJson)
}



//create function that updateMemory(elementIndex)FromHDrive(storage.json) .
//.. this is called at the beginning to recover last state

updateElementIndexFromJson = () => {

    readWriteFunctions.getText(storageURI, (result) => {
        this.elementIndex = JSON.parse(result)
    })
}


// create function updateJsonFromElementIndexObj(elementIndexObj) ...
// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
newEvokFileSystem.startStorage = () => {
    if (storageExists()) {
        this.updateElementIndexFromJson()
    }
    else {
        this.makeNewElementIndex()
        console.log(elementIndex)
    }
}

updateJsonFromElementIndexObj = (currentElementIndex) => {
    var storageSTR = JSON.stringify(currentElementIndex)
    console.log("..storageSTR: " + storageSTR)
    var fileUri = rootDirectory + storageURI
    
    readWriteFunctions.saveText(storageSTR,storageURI, ()=>{
        console.log("..text saved " )
        readWriteFunctions.readText(fileUri)
    })

   /*   FileSystem.writeAsStringAsync(fileUri, storageSTR)
        .then((result) => {
            console.log(result)
        })
        .catch(err => console.error(err))

    readWriteFunctions.saveText (storageSTR, storageURI, (result) => {
          console.log("...this is in JSON: " + result)
      })*/

}

updateElementIndexFromNewElement = (newElement) => {
    elementIndex.elements.push(newElement)
    updateJsonFromElementIndexObj(elementIndex)
}

makeNewElementIndex = () => {
    elementIndex = {
        elements: [{ name: 'obj1', type: 'test' }]
    }
    console.log("..new elementIndex created: " + elementIndex)
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
    return false
}



export default newEvokFileSystem