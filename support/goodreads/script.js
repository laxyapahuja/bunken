const API = 'https://bunken-api.vercel.app/'

let ebookElement = document.createElement('div')
let relatedElement = document.querySelector('[id^="relatedWorks-"]')
let bookTitle = document.querySelector("[property='og:title']").getAttribute("content");
let ISBNCode = document.querySelector("[property='books:isbn']").getAttribute("content");
let searchQuery = ISBNCode
if (ISBNCode == 'null') {
    searchQuery = bookTitle
}
let initial = false

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function ebookElementInflator(results) {
    let string = `<div class="h2Container gradientHeaderContainer">
    <h2 class="brownBackground">E-Books</h2>
</div>
<select id="source">
<option value="libgen">Source: LibGen</option>
<option value="openlibrary">Source: OpenLibrary</option>
</select> <button onclick="sourceSelect()">Select</button>
<div class="bigBoxContent containerWithHeaderContent" style="overflow-y: scroll; height: 300px;">`
    results.forEach(book => {
        string += `<div class="elementList ">
        <div class="left">
            <a class="actionLinkLite bookPageGenreLink" target="_blank" href="${book.link}">${book.title}</a>
        </div>
        <div class="right">${book.author}</div>
        <div class="clear"></div>
    </div>`
    })
    string += '</div>`'
    ebookElement.innerHTML = string
}

function sourceSelect() {
    let e = document.getElementById("source");
    let value = e.options[e.selectedIndex].value;
    mainInflator(searchQuery, value)
}

function mainInflator(searchQuery, source) {
    fetch(`${API}${source}?q=${searchQuery}`).then(response => {
        response.json().then(res => {
            ebookElementInflator(res)
            if (!initial) {
                insertAfter(relatedElement, ebookElement)
                initial = true
            }
        })
    })
}

mainInflator(searchQuery, 'libgen')