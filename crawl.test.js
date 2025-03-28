const {normalizeURL, getURLsFromHTML} = require("./crawl.js")

const { test, expect } =  require("@jest/globals")

test("normalizeURL strip protocol", () => {
    const input = "https://boot.dev/path/"
    const actual = normalizeURL(input) 
    const expected = "boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalizeURL capitals", () => {
    const input = "https://Boot.dev/path"
    const actual = normalizeURL(input) 
    const expected = "boot.dev/path"
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML for absolute and relative", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path1/">
                    Boot.dev blog
                </a>
                <a href="https://blog.boot.dev/path2/">
                    Boot.dev blog
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL) 
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test("getURLsFromHTML for invalid links", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">
                    invalid
                </a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL) 
    const expected = []
    expect(actual).toEqual(expected)
})