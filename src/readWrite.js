import { FileSystem } from 'expo'

//this file is for general functions not specific to Evok functionality

const readWrite = {}
var rootDirectory = FileSystem.documentDirectory

readWrite.createDirectoryIfDoesntExist = (directoryPath, callback) => {
    FileSystem.makeDirectoryAsync(directoryPath)
        .then(() => {
            callback()
        })
        .catch(e => {
            callback()
            console.log('Directory already exists')
        })
}

readWrite.move = (originalFile, currentFolder, fileName, callback) => {
    FileSystem.moveAsync({ from: originalFile, to: currentFolder + '/' + fileName })
        .then(callback)
        .catch(err => console.error(err))
}


readWrite.saveText = (text, to, callback) => {
    FileSystem.writeAsStringAsync(rootDirectory + "/" + to, text)
        .then((result) => {
            callback(result)
        })
        .catch(err => console.error(err))
}

readWrite.readText = (fileUri, callback) => {
    FileSystem.readAsStringAsync(fileUri)
        .then((result) => {
            callback(result)
        })
        .catch(err => console.error(err))
}

readWrite.getText = (from, callback) => {
    FileSystem.readDirectoryAsync(from)
        .then((result) => {
            callback(result)
        })
        .catch(err => console.error(err))
}

readWrite.delete = (FileUri, callback) => {
    FileSystem.deleteAsync(FileUri)
        .then(callback)
        .catch(err => console.error(err))
}

export default readWrite