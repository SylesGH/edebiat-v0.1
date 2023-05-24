var globalData;

async function fetchData() {
    try {
        const response = await fetch("./data/authors.json");
        const datas = await response.json();

        datas.forEach((data) => {
            if (window.location.search.includes("q=") && window.location.search.split("q=")[1] == data.id) {
                document.title = `Edebite | ${data.fullName}`
                fullName.innerText = data.fullName
                bio.innerText = data.bio
                authorImg.setAttribute("src", "./" + data.authorImage)
            }
        })

    } catch (error) {
        console.error(error);
    }
}
fetchData()

const fullName = document.querySelector(".full-name")
const bio = document.querySelector(".bio")
const authorImg = document.querySelector(".author-img")
const back = document.querySelector(".back")

back.addEventListener("click", () => {
    history.back()
})