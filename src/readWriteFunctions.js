import { FileSystem } from 'expo'

//this file is for general functions not specific to Evok functionality

const readWriteFunctions = {}
var rootDirectory = FileSystem.documentDirectory

readWriteFunctions.move = (originalFile, currentFolder, fileName, callback) => {
    FileSystem.moveAsync({ from: originalFile, to: currentFolder + '/' + fileName })
        .then(callback)
        .catch(err => console.error(err))
}


readWriteFunctions.saveText = (text, to, callback) => {
    console.log(rootDirectory)
    /* FileSystem.writeAsStringAsync(rootDirectory + "/" + to, text)
         .then((result) => {
             callback(result)
         })
         .catch(err => console.error(err)) */
}

readWriteFunctions.readText = (fileUri) => {
    FileSystem.readAsStringAsync(fileUri)
        .then((result) => {
            console.log(result)
        })
        .catch(err => console.error(err))
}

readWriteFunctions.getText = (from, callback) => {
    FileSystem.readDirectoryAsync(from)
        .then((result) => {
            callback(result)
        })
        .catch(err => console.error(err))
}

export default readWriteFunctions