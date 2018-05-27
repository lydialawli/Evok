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


            let listOfFileUris = listOfFileNames.map((fileName) => {
                return directoryUri + fileName
            })

            callback(listOfFileUris)
        })
        .catch(err => console.error(err))

}

evokFileSystem.getArrayOfPicObjects = (directoryUri, callback) => {

    FileSystem.readDirectoryAsync(directoryUri)
        .then((listOfFileNames) => {

            let listOfPicObjects = listOfFileNames.map((fileName) => {
                return  {
                    timestamp: fileName.replace(".jpg",""),
                    fileName : fileName,
                    fileUri: directoryUri + fileName
                }
    
            })

            callback(listOfPicObjects)
        })
        .catch(err => console.error(err))

}

evokFileSystem.deleteImagefromGallery = (FileUri, callback) => {

    FileSystem.deleteAsync(FileUri)
        .then(callback, console.log('pic deleted'))
        .catch(err => console.error(err))
}

export default evokFileSystem
