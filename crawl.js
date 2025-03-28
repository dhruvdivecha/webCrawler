const { JSDOM } = require('jsdom')

function getURLsFromHTML( htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")

    for ( const linkELement of linkElements) {
        if (linkELement.href.slice(0, 1) === "/"){
            try {
                const urlObj = new URL (`${baseURL}${linkELement.href}`)
                urls.push (urlObj.href)
            } catch (error) {
                console.log(`error with relative url${error.message}`)
            }
        }else{
            try {
                const urlObj = new URL (`${linkELement.href}`)
                urls.push (urlObj.href)
            } catch (error) {
                console.log(`error with absolute url${error.message}`)
            }
        }
    }
    return urls
}


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
    normalizeURL,
    getURLsFromHTML
}