var gTrans = {
    title: {
        en: 'Welcome to my books shop!',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    add: {
        en: 'Add book',
        he: 'הוסף ספר'
    },
    'max-price': {
        en: 'Max price:',
        he: 'מחיר מקסימלי:'
    },
    'min-rate': {
        en: 'Min rate:',
        he: 'דירוג מינימלי:'
    },
    placeholder: {
        en: 'What to search?',
        he: 'מה לחפש?'
    },
    search: {
        en: 'Search',
        he: 'חפש'
    },
    'book-id': {
        en: 'Id',
        he: 'ברקוד'
    },
    'book-name': {
        en: 'Name',
        he: 'שם'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },
    rate: {
        en: 'Rate',
        he: 'דירוג'
    },
    image: {
        en: 'Image',
        he: 'תמונה'
    },
    action: {
        en: 'Action',
        he: 'פעולות'
    },
    read: {
        en: 'Read',
        he: 'קרא עוד'
    },
    update: {
        en: 'Update',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        he: 'מחק'
    },
    sure: {
        en: 'Do you want to delete this book?',
        he: 'האם אתה בטוח שאתה רוצה למחוק את הספר הזה?'
    },
    'prev-page': {
        en: 'Prev Page',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },

}

var gCurrLang = 'en'


function getTrans(transKey) {
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    var translation = key[gCurrLang]
    if (!translation) translation = key.en
    return translation
}

function tarnslate() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        el.innerText = translation
        if (el.placeholder) el.placeholder = translation
    })
}


function setLang(lang) {
    gCurrLang = lang
}