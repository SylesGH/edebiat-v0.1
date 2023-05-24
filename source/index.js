function hasValue() {
    if (searchInput.value == "") {
        return false
    }
}

const searchForm = document.querySelector("#searchForm")
const recomendedList = document.querySelector("#recomendedList")

if (window.location.hostname.includes("github.io")) {
    searchForm.action = "search"
} else {
    searchForm.action = "search.html"
}

async function fetchData() {
    try {
        const articleResponse = await fetch("./data/articles.json");
        const authorResponse = await fetch("./data/authors.json");
        const articleDatas = await articleResponse.json();
        const authorDatas = await authorResponse.json();

        recomendPiece(articleDatas, 20)

        if (window.location.hostname.includes("github.io")) {
            authorDatas.forEach(authData => {
                authorWrapper.innerHTML += `
                    <li>
                        <a href="${"author.html?q=" + authData.id}" style="appearance: none">${authData.fullName}
                            <img class="img-wrapper" src="./${authData.authorImage}" alt="reload">
                        </a>
                    </li>
                `
            })
        } else {
            authorDatas.forEach(authData => {
                authorWrapper.innerHTML += `
                    <li>
                        <a href="${"author.html?q=" + authData.id}" style="appearance: none">${authData.fullName}
                            <img class="img-wrapper" src="../${authData.authorImage}" alt="reload">
                        </a>
                    </li>
                `
            })
        }

        

    } catch (err) {
        console.error(err);
    }
}
fetchData()

async function recomendPiece(data, count) {
    var random = [];
    random = [...new Set(random)];

    while (random.length < count) {
        random = [...new Set(random)];
        random.push(Math.floor(Math.random() * data.length));
    }
    random = [...new Set(random)];

    for (let i = 0; i < count; i++) {
        var currentIndex = random[i];
        if (currentIndex !== undefined && currentIndex < data.length && data[currentIndex]) {
            var li = document.createElement("li");
            li.innerHTML = `
                <h2 class="recomended-title">${data[currentIndex].title}</h2>
                <p class="recomended-desc">${data[currentIndex].text}</p>
                <div class="recomended-background">
                    <a href="./result.html?q=${data[currentIndex].id}">
                        <button onclick="redirectPage(${data[currentIndex].id})" title="Ne yazıyosa o">Oku</button>
                    </a>
                </div>
            `;
            recomendedList.appendChild(li);
        }
    }
}

function redirectPage(id) {
    if (searchInput.value !== "") {
        localStorage.setItem("searchValue", searchInput.value);
    }
    localStorage.setItem("resultId", id)
    localStorage.setItem("backLink", window.location.href)
}

const topBar = document.querySelector(".top")
var lastScrollTop = 0;
var lastDirection;

// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
document.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop) {
        topBar.classList.add("hide")
   } else if (st < lastScrollTop) {
    topBar.classList.remove("hide")
   }
   lastScrollTop = st <= 0 ? 0 : st;
}, false);

const authorWrapper = document.querySelector(".author-wrapper")
authorWrapper.innerHTML = ``