const { crawlPage } = require("./crawl.js")
const { printReport } = require("./report.js")

async function main() {
    if (process.argv.length < 3 ){
        console.log("no website provide")
        process.exit(1)
    }
    if (process.argv.length > 3 ){
        console.log("Please enter only website")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    
    console.log(`starting crawling at ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})
    
    printReport(pages)
}

main()
