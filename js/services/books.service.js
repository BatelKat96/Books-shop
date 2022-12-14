'use strict'
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 3
var gBooks
var gCurrBookId
var gSortBy
var gIsSort

var gPageIdx = 0
var gFilterBy = { maxPrice: 50, minRate: 0, search: '', lang: 'en' }
var gTxtSearch

_createBooks()
console.log('gBooks:', gBooks)

function movePage(msg) {
    if (msg === 'minus') {
        gPageIdx--
        if (gPageIdx * PAGE_SIZE <= gBooks.length) {
            gPageIdx = 0
        }
    }
    else if (msg === 'plus') {
        gPageIdx++
        if (gPageIdx * PAGE_SIZE >= gBooks.length) {
            gPageIdx = Math.ceil(gBooks.length / PAGE_SIZE) - 1
        }
    }
}

function getBooks() {
    const books = gBooks.filter(book =>
        book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.minRate &&
        book.name.toLowerCase().includes(gFilterBy.search)
    )
    const startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function setGCurrBookId(bookId) {
    gCurrBookId = bookId
    console.log('gCurrBookId:', gCurrBookId)

}

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBookToStorage()
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBookToStorage()
}

function updateBook(bookId, bookPrice) {
    // var book = getBookById(bookId)
    var book = gBooks.find(book => book.id === bookId)

    book.price = bookPrice
    console.log('book:', book)
    _saveBookToStorage()
}

function updateRate(num) {
    var book = gBooks.find(book => book.id === gCurrBookId)

    book.rate = num
    _saveBookToStorage()
}

function setBookFilter(filterBy = {}) {
    gPageIdx = 0
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.search !== undefined) gFilterBy.search = filterBy.search
    if (filterBy.lang !== undefined) gFilterBy.lang = filterBy.lang


    return gFilterBy
}


function setSort(sortBy = {}) {
    if (sortBy.price) {
        gBooks.sort((c1, c2) => (c1.price - c2.price) * sortBy.price)
        gIsSort = !gIsSort
    } else if (sortBy.rate) {
        gBooks.sort((c1, c2) => (c1.rate - c2.rate) * sortBy.rate)
        gIsSort = !gIsSort
    } else if (sortBy.name) {
        gBooks.sort((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.name)
        gIsSort = !gIsSort
    }
}




function getBookById(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book
}

function _createBook(bookName, price, imageUrl = 'books.jpg') {
    return {
        id: makeId(),
        name: bookName,
        price,
        imageUrl,
        rate: 0,
        desc: makeLorem()
    }
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Can You Keep A Secret', 25, 'Can_You_Keep_A_Secret.jpg'),
            _createBook('The Longest Ride', 23, 'The_Longest_Ride.jpg'),
            _createBook('The Last Song', 26, 'The_Last_Song.jpg'),
            _createBook('Harry Potter', 27, 'Harry_Potter.jpg'),
            _createBook('Me Before You', 28, 'Me_Before_You.jpg'),
            _createBook('Percy Jackson', 24, 'Percy_Jackson.jpg'),
        ]
    }
    _saveBookToStorage()
}

function _saveBookToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}


