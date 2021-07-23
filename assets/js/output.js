{
    var ytAppToken = "GOOGLE_CLOUD_API_HERE"
    var genAppToken = "GENIUS_API_HERE"
    var genApiUrl = "https://api.genius.com/search/?q="
    var ytVidUrl = "https://www.youtube.com/watch?v="
    var output = document.querySelector("#output")
    var modal = document.querySelector("#modal")
    var modalClose = document.querySelector("#close-btn")

    var songs = []

    var backBtn = document.querySelector("#back-btn")

    gapi.load("client")

    async function loadClient() {
        gapi.client.setApiKey(`${ytAppToken}`)
        return gapi.client
            .load(
                "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
            )
            .then(
                function () {
                    console.log("GAPI client loaded for API")
                },
                function (err) {
                    showModal(`Error loading GAPI client for API: ${err}`)
                }
            )
    }

    /* Create a DOMString */
    function buildEl(tagName, elText, cssString, elAttr) {
        let el = document.createElement(tagName)
        el.className = cssString || ""
        el.textContent = elText || ""
        for (let i = 0; i < elAttr.length; i++) {
            el.setAttribute(
                elAttr[i].toString().split("#")[0],
                elAttr[i].toString().split("#")[1]
            )
        }
        return el
    }

    var getSongs = async function (value) {
        songs = []
        await fetch(`${genApiUrl}${value}&access_token=${genAppToken}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.message)
                }
                return res.json()
            })
            .then((data) => {
                for (var i = 0; i < 3; i++) {
                    var title = data.response.hits[i].result.full_title
                    var img = data.response.hits[i].result.song_art_image_url
                    songs.push(title, img)
                }
            })
            .catch((err) => {
                showModal(`Issue getting Songs ${err}`)
            })
        return displaySongs(songs)
    }

    var getVideos = async function (value) {
        var vidURL = ""
        await gapi.client.youtube.search
            .list({
                part: ["snippet"],
                maxResults: 1,
                q: `${value}`,
            })
            .then(
                function (response) {
                    vidURL = ytVidUrl + response.result.items[0].id.videoId
                },
                function (err) {
                    showModal(`Issue getting Youtube Links: ${err}`)
                }
            )
        return vidURL
    }

    async function displaySongs(arr) {
        output.textContent = ""
        var videoLink = ""
        for (var i = 0; i < arr.length; i += 2) {
            var el = buildEl("div", "", "tile is-child box", [])
            for (var j = 0; j < 1; j++) {
                await getVideos(arr[i]).then((result) => {
                    videoLink = result
                })
                var link = buildEl("a", arr[i], "", [`href#${videoLink}`])
                var titleEl = buildEl("h2", "", "title", [])
                var imgEl = buildEl("img", "", "", [`src#${arr[i + 1]}`])
                titleEl.appendChild(link)
                el.appendChild(titleEl)
                el.appendChild(imgEl)
            }

            output.appendChild(el)
        }
    }

    var getQuery = function () {
        var searchArr = ""

        if (!document.location.search) {
            showModal("No Search Query")
            return
        }

        searchArr = document.location.search.split("&")

        var query = searchArr[0].split("=").pop()

        getSongs(query)
    }

    backBtn.addEventListener("click", (e) => {
        location.assign("index.html")
    })

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

    window.onload = function () {
        loadClient().then(() => {
            getQuery()
        })
    }
}
