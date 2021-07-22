{
    var ytAppToken = localStorage.getItem("ytAppToken")
        ? localStorage.getItem("ytAppToken")
        : "AIzaSyAqIufU5EeI9fBAs31i-vFXoJygeTTrBxQ"
    var genAppToken = localStorage.getItem("genAppToken")
        ? localStorage.getItem("genAppToken")
        : "iKYR9jLVV-7Vuxd_ssoepsT6uh8h8Zjxcy_7i2Pyg-GU3t5DFegCdf80hQcSzodT"
    var genApiUrl = "https://api.genius.com/search/?q="
    var ytVidUrl = "https://www.youtube.com/watch?v="
    var output = document.querySelector("#output")

    var songs = []

    var backBtn = document.querySelector("#back-btn")

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

    function displaySongs(arr) {
        output.textContent = ""
        for (var i = 0; i < arr.length; i + 2) {
            var el = buildEl("div", "", "tile is-child box", [])
            var titleEl = buildEl("h2", arr[i], "title", [
                `data-link#${arr[i].toString().replace(/" "/g, "-").trim()}`,
            ])
            var imgEl = buildEl("img", "", "", [`src#${arr[i + 1]}`])
            el.appendChild(titleEl)
            el.appendChild(imgEl)
            output.appendChild(el)
        }
    }

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
                    console.error("Error loading GAPI client for API", err)
                }
            )
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
                return err
            })
        return displaySongs(songs)
    }

    var getVideos = async function (value) {
        gapi.client.youtube.search
            .list({
                part: ["snippet"],
                maxResults: 1,
                q: `${value}`,
            })
            .then(
                function (response) {
                    var vidURL = ytVidUrl + response.result.items[0].id.videoId
                    return vidURL
                },
                function (err) {
                    console.error("Execute error", err)
                }
            )
    }

    var getQuery = function () {
        var searchArr = document.location.search.split("&")

        var query = searchArr[0].split("=").pop()

        getSongs(query)
    }

    backBtn.addEventListener("click", (e) => {
        location.assign("index.html")
    })

    //gapi.load("client")

    window.onload = function () {
        //loadClient()
        getQuery()
    }
}
