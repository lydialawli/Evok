import readWrite from '../src/readWrite.js'
import { FileSystem } from 'expo'

//import { Elements } from '../storage.json'

var elements = []
var elementIndex = {}
var storageFileName = 'storage-test.json'
var rootDirectory = FileSystem.documentDirectory
var imagesFolder = 'images'

const newEvokFileSystem = {}

//create function that updateMemory(elementIndex)FromHDrive(storage.json) .
//.. this is called at the beginning to recover last state
newEvokFileSystem.startStorage = (callback) => {
    this.storageExists(this.onStorageExistsSolved, callback)
}

storageExists = (callback1, callback) => {
    let fileUri = rootDirectory + storageFileName

    FileSystem.getInfoAsync(fileUri).then((obj) => {
        //console.log(obj)
        callback1(obj.exists, callback)
    })
}

onStorageExistsSolved = (exists, callback) => {
    if (exists) {
        //console.log("this is callback: " + callback)
        this.updateElementIndexFromJson(callback)
    }
    else {
        this.makeNewElementIndex(callback)
    }

}

newEvokFileSystem.deleteImagesDirectory = () => {
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
    var fileUri = rootDirectory + storageFileName
    readWrite.readText(fileUri, (result) => {
        elementIndex = JSON.parse(result)
        console.log("..elementIndex updated: " + JSON.stringify(elementIndex))
        callback()
    })
}

newEvokFileSystem.getArrayOfElements = () => {
    return elementIndex.elements
}


//only called once when the app is first ever used:
makeNewElementIndex = (callback) => {
    elementIndex = {
        elements: []
    }
    console.log("..new elementIndex created: " + elementIndex)
    updateJsonFromElementIndexObj(elementIndex, callback)
}



// this is called everytime we change the elementObjectIndex inside the app, so next time we open the app everything stills the same
updateJsonFromElementIndexObj = (currentElementIndex, callback) => {
    var storageSTR = JSON.stringify(currentElementIndex)
    //console.log("..storageSTR: " + storageSTR)
    var fileUri = rootDirectory + storageFileName

    readWrite.saveText(storageSTR, storageFileName, () => {
        //console.log("..text saved " )
        readWrite.readText(fileUri, (result) => {
            //console.log("..updated json as: " + JSON.stringify(result))
            callback()
        })
    })
}


newEvokFileSystem.getIndexfromElementID = (elementID) => {
    //Shorter way: index = this.state.elements.map(e => e.id).indexOf(elementID)
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
        newEvokFileSystem.deleteImageFromFileSystem(imageToDelete, i, elementID)
    }
    console.log('directory "' + elementIndex.elements[ind].name + '" deleted')
}

newEvokFileSystem.deleteImageFromFileSystem = (fileUri) => {
    var fileToDelete = rootDirectory + 'images/' + fileUri
    readWrite.delete(fileToDelete, console.log("image [" + fileUri + "] is deleted from fileSystem"))

}

newEvokFileSystem.deleteImage = (fileUri, i, elementID, callback) => {

    newEvokFileSystem.deleteImageFromFileSystem(fileUri)

    var eIndex = newEvokFileSystem.getIndexfromElementID(elementID)

    elementIndex.elements[eIndex].imageHistory.splice(i, 1)
    console.log('new element Index>', elementIndex)

    updateJsonFromElementIndexObj(elementIndex, readImagesDirectory)
   callback(elementID)
}

newEvokFileSystem.getElementObj = (elementID) => {
    i = newEvokFileSystem.getIndexfromElementID(elementID)

    //console.log("this is elementObj: " + JSON.stringify(elementIndex.elements[i]))
    return elementIndex.elements[i]
}

newEvokFileSystem.getImagePath = (fileUri) => {
    return rootDirectory + 'images/' + fileUri
}

newEvokFileSystem.addNewElement = (elementName, timeOfCreation, type, callback) => {
    let newElement = {
        name: elementName,
        id: timeOfCreation,
        type: type,
        imageHistory: [
            /* {
                "uri": "/1546300800.jpg",
                 "timestamp": 1546300800
             },
             { 
                 "uri": "/1548979200.jpg",
                 "timestamp": 1548979200
             },
             { 
                 "uri": "/1551398400.jpg",
                 "timestamp": 1551398400
             },
             { 
                 "uri": "/1551744000.jpg",
                 "timestamp": 1551744000
             },
             { 
                 "uri": "/1554076800.jpg",
                 "timestamp": 1554076800
             },
             { 
                 "uri": "/1556668800.jpg",
                 "timestamp": 1556668800
            }*/
        ]
    }
    console.log("..new Element created: " + elementName)
    updateElementIndexFromNewElement(newElement, callback)
}

updateElementIndexFromNewElement = (newElement, callback) => {
    elementIndex.elements.push(newElement)
    updateJsonFromElementIndexObj(elementIndex, callback)
}

newEvokFileSystem.saveImage = (originalFile, elementID, callback, callback2) => {
    var fileName = Date.now() + '.jpg'
    var currentFolder = rootDirectory + imagesFolder

    readWrite.move(originalFile, currentFolder, fileName, updateElementIndexFromNewInstant(elementID, fileName, callback, callback2))
}

newEvokFileSystem._downloadImage = (originalFile, elementID, callback, callback2) => {
    var fileName = Date.now() + '.jpg'
    var currentFolder = rootDirectory + imagesFolder
    FileSystem.downloadAsync(
        originalFile,
        currentFolder + '/' + fileName
    )
        .then(
            updateElementIndexFromNewInstant(elementID, fileName, callback, callback2)
        )
        .catch(error => {
            console.error(error);
        });
    //readWrite.download(originalFile, currentFolder, fileName, updateElementIndexFromNewInstant(elementID, fileName, callback, callback2))
}

updateElementIndexFromNewInstant = (elementID, fileName, callback, callback2) => {
    i = newEvokFileSystem.getIndexfromElementID(elementID)

    let newInstance = {
        uri: fileName,
        timestamp: fileName.replace(".jpg", "")
    }

    elementIndex.elements[i].imageHistory.push(newInstance)

    updateJsonFromElementIndexObj(elementIndex, this.onInstanceCreated)

    callback(elementID)
    callback2(rootDirectory + "images/" + fileName)
}

onInstanceCreated = () => { console.log("Instance is saved in storage.json") }


export default newEvokFileSystem