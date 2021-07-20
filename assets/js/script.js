{
    var ytAppId = localStorage.getItem("ytapikey")
    var ytApiUrl = "https://www.googleapis.com/youtube/v3/search"
    var genAppToken = localStorage.getItem("genAppToken") //
    var genApiUrl = "https://api.genius.com/search/?q="

    var output = "../../output.json"

    var searchInput = document.querySelector("#search-bar")
    var searchBtn = document.querySelector("search-button")

    var songs = []

    var getSongs = async function (value) {
        fetch(`${genApiUrl}${value}&access_token=${genAppToken}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.message)
                }
                return res.json()
            })
            .then((data) => {
                var title = data.hits[i].result.full_title
                var img = data.hits[i].result.song_art_image_thumbnail_url
                songs.push(title, img)
            })
            .catch((err) => {
                return err
            })
    }

    var getQuery = function () {
        var searchArr = document.location.search.split("&")

        var query = searchArr[0].split("=").pop()

        getSongs(query)
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

    function pharseSongs() {}
}
