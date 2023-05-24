var globalData;

async function fetchData() {
    try {
        const articleResponse = await fetch("./data/articles.json");
        const authorResponse = await fetch("./data/authors.json");
        const articleDatas = await articleResponse.json();
        const authorDatas = await authorResponse.json();

        articleDatas.forEach((data) => {
            if (window.location.search.includes("q=") && window.location.search.split("q=")[1] == data.id) {
                document.title = `Edebite | ${data.title}`
                title.innerText = data.title
                text.innerText = data.text

                authorDatas.forEach(authData => {
                    if (authData.fullName == data.author) {
                        author.innerHTML = `<a href="${"author.html?q=" + authData.id}" style="appearance: none">${authData.fullName}</a>`
                    }
                })
            }
        })

    } catch (error) {
        console.error(error);
    }
}
fetchData()

const title = document.querySelector(".title")
const text = document.querySelector(".text")
const author = document.querySelector(".author")
const back = document.querySelector(".back")

back.addEventListener("click", () => {
    if (!sessionStorage.getItem("fromMain")) {
        window.location.replace("search.html")
    } else {
        window.location.href = localStorage.getItem("backLink")
        localStorage.removeItem("backLink")
    }
})