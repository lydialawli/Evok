import readWrite from '../src/readWrite.js'
import { FileSystem } from 'expo'

//import { Elements } from '../storage.json'

var elements = []
var elementIndex = {}
var storageURI = 'storage.json'
var rootDirectory = FileSystem.documentDirectory
var imagesFolder = 'images'

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

newEvokFileSystem.deleteImagesDirectory = () =>  {
    var file = rootDirectory + imagesFolder

    readWrite.delete(file, console.log("images directory deleted"))
}

readImagesDirectory = () => {
    imagesPath = rootDirectory + imagesFolder

    readWrite.getText(imagesPath, this.consoleImages)
}

consoleImages = (result) => {
    console.log("List of Images: " + result)
}

newEvokFileSystem.createImagesDirectoryIfDoesnotExist = () => {
    let imagesPath = rootDirectory + imagesFolder

    readWrite.createDirectoryIfDoesntExist(imagesPath, this.readImagesDirectory)
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


newEvokFileSystem.getIndexfromElementID = (elementID) => {
    //Shorter way: index = this.state.elements.map(e => e.id).indexOf(1546611852196)
    index = -1
    for (var i = 0; i < elementIndex.elements.length; i++) {
        if (elementIndex.elements[i].id === elementID) {
            index = i
            break
        }
    }
    //console.log("index is: " + index)
    return index
}

newEvokFileSystem.deleteElementObj = (elementID, callback) => {
    i = newEvokFileSystem.getIndexfromElementID(elementID)

    deleteAllImagesFromElementObj(elementID, i)

    elementIndex.elements.splice(i, 1)
    updateJsonFromElementIndexObj(elementIndex, callback)
    
    readImagesDirectory()

}

deleteAllImagesFromElementObj = (elementID, ind) => {
    var imagesArray = elementIndex.elements[ind].imageHistory
    var imageToDelete = ''

    for (var i = 0; i < imagesArray.length; i++) {
        imageToDelete = imagesArray[i].uri
        deleteImageFromFileSystem(imageToDelete)
    }
}

deleteImageFromFileSystem = (fileUri) => {
    var fileToDelete = rootDirectory + 'images/' + fileUri
    readWrite.delete(fileToDelete,
        console.log("image [" + fileUri + "] is deleted from fileSystem"))
}

newEvokFileSystem.getElementObj = (elementID) => {
    i = newEvokFileSystem.getIndexfromElementID(elementID)

    //console.log("this is elementObj: " + JSON.stringify(elementIndex.elements[i]))
    return elementIndex.elements[i]

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

updateElementIndexFromNewElement = (newElement, callback) => {
    elementIndex.elements.push(newElement)
    updateJsonFromElementIndexObj(elementIndex, callback)
}

newEvokFileSystem.saveImage = (originalFile, elementID, callback) => {
    var fileName = Date.now() + '.jpg'
    var currentFolder = rootDirectory + imagesFolder


    readWrite.move(originalFile, currentFolder, fileName, updateElementIndexFromNewInstant(elementID, fileName, callback))
}

updateElementIndexFromNewInstant = (elementID, fileName, callback) => {
    i = newEvokFileSystem.getIndexfromElementID(elementID)

    let newInstance = {
        uri: fileName,
        timestamp: fileName.replace(".jpg", "")
    }

    elementIndex.elements[i].imageHistory.push(newInstance)

    updateJsonFromElementIndexObj(elementIndex, this.onInstanceCreated)

    callback(elementID)
}

onInstanceCreated = () => { console.log("Instance is saved in storage.json") }


storageExists = () => {
    return true
}



export default newEvokFileSystem