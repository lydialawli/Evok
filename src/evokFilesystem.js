import { FileSystem } from 'expo'

const evokFileSystem = {}

evokFileSystem.getPath = (projectFolder, fileName) => {
    let expoDirectory = FileSystem.documentDirectory
    console.log('..getPath done')
    return expoDirectory + projectFolder + '/' + fileName

}

evokFileSystem.createDirectoryIfDoesntExist = (directoryPath, callback) => {
    FileSystem.makeDirectoryAsync(directoryPath)
        .then(() => {
            callback()
        })
        .catch(e => {
            callback()
            console.log(e, 'Directory already exists')
        })
}

evokFileSystem.moveFile = (originalFile, currentFolder, fileName, callback) => {
    FileSystem.moveAsync({ from: originalFile, to: currentFolder + '/' + fileName })
        .then(callback)
        .catch(err => console.error(err))
}

evokFileSystem.listAllFilesinSpecificDirectory = (fileUri, callback) => {
    FileSystem.readDirectoryAsync(fileUri)
        .then((result) => { 
            callback(result)
        })
        .catch(err => console.error(err))
}

export default evokFileSystem
