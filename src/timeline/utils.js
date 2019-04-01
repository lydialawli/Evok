

const utils = {}

utils.milisecIntoPixels = (ms, msToPixelsFactor) => {
    return ms * msToPixelsFactor
}


utils.getFullDurationInPixels = (array, msToPixelsFactor) => {
    if (array.length === 0)
        return 0

    let arrayLastItem = array.length - 1
    return utils.milisecIntoPixels(array[arrayLastItem].timestamp - array[0].timestamp, msToPixelsFactor)
}

utils.getMsSinceGenesisTimestamp = (x, genesisTimestamp) => {
    return x.timestamp - genesisTimestamp
}



export default utils 
