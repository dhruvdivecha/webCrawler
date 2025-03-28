function normalizeURL(urlstring) {
    const urlObj = new URL(urlstring)
    const strippedURL = `${urlObj.hostname}${urlObj.pathname}`
    const lowercasedURL = strippedURL.toLowerCase()

    if (lowercasedURL.length > 0 && lowercasedURL.slice(-1) === "/"){
        return lowercasedURL.slice( 0, -1 )
    }
    return lowercasedURL
}

module.exports = {
    normalizeURL
}