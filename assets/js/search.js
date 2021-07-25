var searchFormEl = document.querySelector("#search-form")
var modal = document.querySelector("#modal")
var modalClose = document.querySelector("#close-btn")

function lyricSeach(event) {
    event.preventDefault()
    var searchInput = document.querySelector("#lyric-input")
    var Input = searchInput.value

    if (!Input) {
        showModal("You need a search input value!")
        return
    }

    var queryString = `output.html?q=${encodeURIComponent(Input).replace(
        /%20/g,
        "+"
    )}`

    location.assign(queryString)
}

function showModal(msg) {
    var msgEl = document.querySelector("#message")
    msgEl.textContent = msg
    modal.style.display = "flex"
}

modalClose.onclick = function () {
    modal.style.display = "none"
}

window.onclick = function (e) {
    if (e.target.parentElement == modal) {
        modal.style.display = "none"
    }
}

searchFormEl.addEventListener("submit", lyricSeach)
