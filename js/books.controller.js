'use strict'

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
}


function renderBooks() {
    const books = getBooks()
    // const{id,imageUrl,name,price,rate}=book
    var strHTMLs = books.map(book => {

        return `<tr>
        <td>${book.id}</td>
        <td>${book.name} </td>
        <td>${book.price} </td>
        <td>${book.rate} </td>
        <td><img src="./img/${book.imageUrl}" alt="${book.name}" class="img-book"/> </td> 
        <td><button class=" btn-action btn-read" onclick="onOpenModal(event,'${book.id}')" data-trans="read"> ${getTrans("read")}</button> </td>
        <td><button class="btn-action btn-update" onclick="onUpdateBook(event,'${book.id}')" data-trans="update">${getTrans("update")}</button> </td>
        <td><button class="btn-action btn-remove" onclick="onRemoveBook(event,'${book.id}')" data-trans="delete">${getTrans("delete")}</button> </td>
        </tr>`
    })
    document.querySelector('.gBooks-list').innerHTML = strHTMLs.join('')
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    if (confirm('Do you want to delete this book? ')) {
        removeBook(bookId)
        renderBooks()
    }
}

function onAddBook() {
    var name = prompt('Enter book name')
    var price = +prompt('Enter book price')
    if (name && price) {
        addBook(name, price)
        renderBooks()
    }
}

function onSearch(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('input[name="search-txt"]')
    const txt = elTxt.value.toLowerCase()
    onSetFilterBy({ search: txt })

    renderBooks()
}

function onUpdateBook(ev, bookId) {
    ev.stopPropagation()
    var bookPrice = +prompt('What is the new book price?')
    if (bookPrice) {
        updateBook(bookId, bookPrice)
        renderBooks()
    }
}

function onOpenModal(ev, bookId) {
    ev.stopPropagation()
    setGCurrBookId(bookId)
    var book = getBookById(bookId)
    renderModal(book)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
}

function renderModal(book) {
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = book.name
    elModal.querySelector('.book-price-count').innerText = book.price
    elModal.querySelector('.desc').innerText = book.desc
    elModal.querySelector('.rate1').innerText = book.rate
}

function onUpdateRate(msg) {
    var elRate = document.querySelector('.rate1')

    if (msg === 'minus') {
        if (elRate.innerText > 0) elRate.innerText--
    } else if (msg === 'plus') {
        if (elRate.innerText < 10) elRate.innerText++
    }

    updateRate(elRate.innerText)
    renderBooks()
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&search=${filterBy.search}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 50,
        minRate: +queryStringParams.get('minRate') || 0,
        search: queryStringParams.get('search') || ''
    }

    if (!filterBy.minRate && !filterBy.maxPrice) return

    document.querySelector('.filter-max-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-min-rate-range').value = filterBy.minRate
    document.querySelector('input[name="search-txt"]').value = filterBy.search
    setBookFilter(filterBy)
}


function onMovePage(msg) {

    movePage(msg)
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    tarnslate()
    renderBooks()
}