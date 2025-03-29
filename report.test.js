const { test, expect } =  require("@jest/globals")

const { sortPages } = require("./report.js")

test("sortPages", () => {
    const input = {
        "https://google.com/path" : 1,
        "https://google.com" : 3

    }
    const actual = sortPages(input) 
    const expected = [

        ["https://google.com", 3],
        ["https://google.com/path", 1],
    ]
    expect(actual).toEqual(expected)
})