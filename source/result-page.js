function hasValue() {
    if (searchInput.value == "") {
        return false
    } else {
        if (window.location.hostname.includes("github.io")) {
            window.location.pathname = window.location.pathname.replace(window.location.pathname.split("/").pop(), "search")
        } else {
            window.location.pathname = window.location.pathname.replace(window.location.pathname.split("/").pop(), "search.html")
        }
        localStorage.setItem("searchValue", searchInput.value)
        return false
    }
}