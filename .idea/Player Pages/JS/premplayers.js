let id = 100
let playerInfo;
playerInfo = {
    fetchPlayerInfo: function (nameofplayer) {
        fetch("https://v3.football.api-sports.io/players?league=39&search=" + nameofplayer, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayPlayerInfo(data))
            .catch(error => console.log('error', error));
    },
    displayPlayerInfo: function (data) {
        let playeresp = data['response']
        let {age, name, nationality} = playeresp[0]["player"]
        let test = playeresp[0]["statistics"][0]
        console.log(playeresp, age, name, nationality, test)
    },
    search: function () {
        this.fetchPlayerInfo(document.querySelector(".search-bar").value);
    },
};

    document.querySelector(".search button").addEventListener("click", function () {
        playerInfo.search();
    })

    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            playerInfo.search();
        }
    });