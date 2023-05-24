document.cookie = "SameSite=Strict"
let globalData;

async function fetchData() {
    try {
        const response = await fetch("./data/articles.json");
        const data = await response.json();
        globalData = data
        page = urlParams.has("p") && parseInt(urlParams.get("p")) || 1
        reload()
    } catch (err) {
        console.error(err);
        errorFunc()
    }
}
fetchData()

const searchInput = document.querySelector("#searchInput")
const searchResults = document.querySelector(".searchResults")
let urlParams = new URLSearchParams(window.location.search);

searchInput.value = urlParams.has("q") && urlParams.get("q") || ""

searchInput.addEventListener("input", () => {
    reload()
    if (window.location.hostname.includes("github.io")) {
        if (searchInput.value !== "") {
            window.history.pushState("", "", "search?q=" + searchInput.value + "&p=" + page)
        } else {
            window.history.pushState("", "", "search")
        }
    } else {
        if (searchInput.value !== "") {
            window.history.pushState("", "", "search.html?q=" + searchInput.value + "&p=" + page)
        } else {
            window.history.pushState("", "", "search.html")
        }
    }
    urlParams = new URLSearchParams(window.location.search);
})

const paginationControls = document.querySelector(".pageNums")
const paginationWrapper = document.querySelector(".paginationControls")
const previousPageButton = document.querySelector(".prevPageBtn")
const nextPageButton = document.querySelector(".nextPageBtn")
const firstPageButton = document.querySelector(".firstPageBtn")
const lastPageButton = document.querySelector(".lastPageBtn")
const noResult = document.querySelector(".no-result")
const noResultText = document.querySelector("#polaroidText")
const results = document.querySelectorAll(".result")
const resultsPerPageWrapper = document.querySelector(".resultPerPageWrapper")
const resultsPerPageSelect = document.querySelector("#resultPerPage")

//result per page text show
if (window.innerWidth >= 900 && window.innerWidth < 1135) {
    resultsPerPageWrapper.children[0].style.display = "block"
    resultsPerPageWrapper.children[0].innerText = "Sayfa başı sonuç:"
} else if (window.innerWidth >= 1135) {
    resultsPerPageWrapper.children[0].style.display = "block"
    resultsPerPageWrapper.children[0].innerText = "Sayfa başı "
} else if (window.innerWidth > 800) {
    resultsPerPageWrapper.children[0].style.display = "block"
    resultsPerPageWrapper.children[0].innerText = "Syf Bşı Snç"
} else {
    resultsPerPageWrapper.children[0].style.display = "none"
    resultsPerPageWrapper.children[0].innerText = ""
}

var resultsPerPage = resultsPerPageSelect.value;
var page = 1

resultsPerPageSelect.addEventListener("change", () => {
    resultsPerPage = resultsPerPageSelect.value;
    localStorage.setItem("resultPerPage", resultsPerPage)
    reload()
})

function errorFunc() {
    resultsPerPageWrapper.children[0].style.display = "none"
    resultsPerPageWrapper.children[1].style.display = "none"
    resultsPerPageWrapper.children[2].style.display = "block"
    resultsPerPageWrapper.children[2].style.color = "darkred"
    resultsPerPageWrapper.children[2].innerText = "Sonuçlar gösterilemiyor."
    chancePercent("eroro", 1)
    noResult.classList.remove("hidden")
    noResultText.style.color = "darkred"
    noResultText.innerHTML = `Bir hata oluştu. Lütfen daha fazla bilgi için <a style="color: red; text-decoration: underline;" href="mailto:ahmetoren51@gmail.com?subject=JSON ERROR&body=We don't talk about it...">e-mail</a> adresimize ulaşın.`
}

function returnToHomePage() {
    if (window.location.hostname.includes("github.io")) {
        window.location.pathname = window.location.pathname.replace("/search", "")
    } else {
        window.location.replace("index.html")
    }
}

document.onkeydown = (e) => {
    if (e.key == "ArrowRight") {
        page++
        reload()
    } else if (e.key == "ArrowLeft") {
        page--
        reload()
    }
}

//page
function reload() {

    if (window.location.hostname.includes("github.io")) {
        if (searchInput.value !== "" || page !== 1) {
            window.history.pushState("", "", "search?q=" + searchInput.value + "&p=" + page)
        } else {
            window.history.pushState("", "", "search")
        }
    } else {
        if (searchInput.value !== "" || page !== 1) {
            window.history.pushState("", "", "search.html?q=" + searchInput.value + "&p=" + page)
        } else {
            window.history.pushState("", "", "search.html")
        }
    }

    if (localStorage.getItem("resultPerPage") !== null) {
        resultsPerPageSelect.value = localStorage.getItem("resultPerPage")
        resultsPerPage = localStorage.getItem("resultPerPage")
        if (localStorage.getItem("resultPerPage") == 12) {
            localStorage.removeItem("resultPerPage")
        }
    }
    
    results.forEach(result => {
        result.children[1].style.webkitLineClamp = Math.floor((result.clientHeight / 16) / 3)
    })

    const value = searchInput.value.replace(/İ/gi, 'I').replace(/\s+/g, '').toLowerCase()/* .split(''); */

    let filteredData = []
    globalData.forEach((data) => {
        var author = data.author.replace(/İ/gi, 'I').replace(/\s+/g, '').toLowerCase()
        var title = data.title.replace(/İ/gi, 'I').replace(/\s+/g, '').toLowerCase()

        if (author.includes(value) || title.includes(value)) {
            filteredData.push(data)
        }
    })

    // clear existing results
    searchResults.innerHTML = ""

    // calculate number of pages required based on filtered data
    const numPages = Math.ceil(filteredData.length / resultsPerPage);

    //if current page is on the non-existing page
    while (page > numPages) {
        page--
    }

    while (page <= 0) {
        page++
    }

    // display results for first page
    displayResults(page, filteredData, numPages);

    //reload page buttons
    reloadPageBtns(numPages, filteredData)

    //load anim
    const hiddenElements = document.querySelectorAll(".hidden")
    hiddenElements.forEach((el) => observer.observe(el))
}

function displayResults(pageNumber, datas, numPages) {
    // calculate starting and ending indices for current page
    const startIndex = (pageNumber - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + parseInt(resultsPerPage), datas.length);

    // create HTML for current page
    let html = '';
    for (let i = startIndex; i < endIndex; i++) {
        const result = datas[i];
        if (window.location.hostname.includes("github.io")) {
            html += `
            <div class="result hidden" style="--order: ${result.id}">
                <h2>${result.title}</h2>
                <p class="desc">${result.text}</p>    
                <h5 class="author">${result.author}</h5>  
                <div class="read">
                <a href="./result?q=${result.id}">
                    <button onclick="localStorage.setItem('backLink', window.location.href)" title="Ne yazıyosa o">Oku</button>
                </a>
                </div>      
            </div>
        `;
        } else {
            html += `
            <div class="result hidden" style="--order: ${result.id}">
                <h2>${result.title}</h2>
                <p class="desc">${result.text}</p>    
                <h5 class="author">${result.author}</h5>  
                <div class="read">
                <a href="./result.html?q=${result.id}">
                    <button onclick="localStorage.setItem('backLink', window.location.href); sessionStorage.setItem('fromMain', true)" title="Ne yazıyosa o">Oku</button>
                </a>
                </div>      
            </div>
        `;
        }
    }

    if (html == "" && searchResults.innerHTML == "") {
        noResult.classList.remove("hidden")
        paginationWrapper.classList.add("hidden")
    } else {
        noResult.classList.add("hidden")
        paginationWrapper.classList.remove("hidden")
    }

    // set the HTML for the search results
    searchResults.innerHTML = html;


    // create pagination controls
    let pagination = ''
    let ellipsis = '<span class="ellipsis">...</span>'
    const numButtonsToShow = 5

    if (numPages <= numButtonsToShow) {
        for (let i = 1; i <= numPages; i++) {
            pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
        }
    } else {
        let leftEllipsis = true;
        let rightEllipsis = true;

        for (let i = 1; i <= numPages; i++) {
            if (page == 1) {
                if (i === page || (i >= page - 1 && i <= page + 3)) {
                    pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
                }   
            } else if (page == 2) {
                if (i === page || (i >= page - 1 && i <= page + 2)) {
                    pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
                }   
            } else if (page == numPages) {
                if (i === page || (i >= page - 3 && i <= page + 1)) {
                    pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
                } 
            } else if (page == numPages - 1) {
                if (i === page || (i >= page - 2 && i <= page + 1)) {
                    pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
                } 
            } else {
                if (i === page || (i >= page - 1 && i <= page + 1)) {
                    pagination += `<button class="pageNum ${i === page ? ' active' : ''}" onclick="page = ${i}; reload(); window.scroll(0,0);">${i}</button>`;
                }
            }  

            
            if (page > 2 && numPages > 5) {
                if (leftEllipsis) {
                    leftEllipsis = false;
                    pagination = `${ellipsis}${pagination}`;
                }
            }
        }
    }
    if (page < numPages - 1 && numPages > 5) {
        pagination += ellipsis
        
    }
    paginationControls.innerHTML = pagination
}

function reloadPageBtns(dataCount, data) {
    if (dataCount == 1) {
        previousPageButton.classList.add("unavaible")
        nextPageButton.classList.add("unavaible")
        firstPageButton.style.display = "none"
        lastPageButton.style.display = "none"
    } else {
        if (page <= 1) {
            previousPageButton.classList.add("unavaible")
            firstPageButton.style.display = "none"
        } else {
            previousPageButton.classList.remove("unavaible")
            firstPageButton.style.display = ""
        }
    
        if (page >= Math.ceil(data.length / resultsPerPage)) {
            nextPageButton.classList.add("unavaible")
            lastPageButton.style.display = "none"
        } else {
            nextPageButton.classList.remove("unavaible")
            lastPageButton.style.display = ""
        }
    }
}

function previousPage() {
    window.scroll(0,0);
    page--
    reload()
}

function nextPage() {
    window.scroll(0,0) 
    page++
    reload()
}

//observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show"/* , "animate" */)
        } else {
            entry.target.classList.remove("show")
        }
    })
})