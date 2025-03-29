const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
   try {
    const res = await fetch(currentURL)

    if (res.status > 399){
        console.log(`error in fetch with status code ${res.status}, on page: ${currentURL}`)
        return
    }

    const contentType = res.header.get("content-type")
    if(!contentType.includes("text/html")){
        console.log(`non HTML page, content-type: ${contentType}, on page: ${currentURL}`)
        return
    }

    console.log(await res.text())
   } catch (error) {
    console.log(`error in fetch: ${error.message}, on page: ${currentURL}`)
   }
}


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
    getURLsFromHTML,
    crawlPage,
}