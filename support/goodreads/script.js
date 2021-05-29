const API = 'https://api.bunken.tk/'

let ebookElement = document.createElement('div')
let relatedElement = document.querySelector('[id^="relatedWorks-"]')
let bookTitle = document.querySelector("[property='og:title']").getAttribute("content");
let ISBNCode = document.querySelector("[property='books:isbn']").getAttribute("content");
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
<option value="motw">Source: Memory Of The World</option>
<option value="libgen/fiction">Source: LibGen Fiction</option>
<option value="openlibrary">Source: OpenLibrary</option>
</select> <button onclick="sourceSelect()">Select</button>
<div class="bigBoxContent containerWithHeaderContent" style="overflow-y: scroll; height: 300px;" id="resultsDiv">`
    results.forEach(book => {
        string += `<div class="elementList">
        <div>
            <a class="actionLinkLite bookPageGenreLink" target="_blank" href="${book.link}">${book.title}</a>
        </div>`
        if (book.downloads != null) {
            book.downloads.forEach(download => {
                string += `<div><a style="color: blue;" href="${download.link}">${download.format}</a></div>`
            })
        }
        string += `<div>${book.author}</div>
        <div class="clear"></div>
    </div>`
    })
    string += '</div>'
    ebookElement.innerHTML = string
}

function sourceSelect() {
    let e = document.getElementById("source");
    let value = e.options[e.selectedIndex].value;
    mainInflator(value)
}

function mainInflator(source) {
    fetch(`${API}${source}?title=${bookTitle}&isbn=${ISBNCode}`).then(response => {
        response.json().then(res => {
            ebookElementInflator(res)
            if (!initial) {
                insertAfter(relatedElement, ebookElement)
                initial = true
            }
        })
    })
}

mainInflator('libgen')