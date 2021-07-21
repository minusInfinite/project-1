{
    var ytAppToken =
        localStorage.getItem("ytAppToken") ||
        "AIzaSyAqIufU5EeI9fBAs31i-vFXoJygeTTrBxQ"
    var genAppToken =
        localStorage.getItem("genAppToken") ||
        "iKYR9jLVV-7Vuxd_ssoepsT6uh8h8Zjxcy_7i2Pyg-GU3t5DFegCdf80hQcSzodT"
    var genApiUrl = "https://api.genius.com/search/?q="
    var ytVidUrl = "https://www.youtube.com/watch?v="

    var output = "../../output.json"

    var searchInput = document.querySelector("#search-bar")
    var searchBtn = document.querySelector("search-button")

    function loadClient() {
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
        var songs = []
        fetch(`${genApiUrl}${value}&access_token=${genAppToken}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.message)
                }
                return res.json()
            })
            .then((data) => {
                for (var i = 0; i < 3; i++) {
                    songs.push(
                        data.response.hits[i].results.full_title,
                        data.response.hits[i].results.song_art_image_url
                    )
                }
            })
            .catch((err) => {
                return err
            })
        return { songs }
    }

    var getVideos = async function (value) {
        return gapi.client.youtube.search
            .list({
                part: ["snippet"],
                maxResults: 1,
                q: `${value}`,
            })
            .then(
                function (response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response)
                },
                function (err) {
                    console.error("Execute error", err)
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

    var getQuery = function () {
        var searchArr = document.location.search.split("&")

        var query = searchArr[0].split("=").pop()

        getSongs(query).then()
    }
}
