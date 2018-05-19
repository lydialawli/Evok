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

evokFileSystem.getFilesUriInDirectory = (directoryUri, callback) => {

    FileSystem.readDirectoryAsync(directoryUri)
        .then((listOfFileNames) => { 
            let listOfFileUris= []

            for(let i=0; i<listOfFileNames.length;i++){
               let fileUri =  directoryUri + '/' + listOfFileNames[i]
               listOfFileUris.push(fileUri)
            }

            callback(listOfFileUris)
        })
        .catch(err => console.error(err))

        
}

export default evokFileSystem
