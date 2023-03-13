let id = 100
let test = 200
let position = "placeholder"
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
        let stats = playeresp[0]["statistics"][0]
        let {total, assists} = stats["goals"]
        let {accuracy, passes} = stats["passes"]
        position = stats["games"]["position"]
        let {appearences} = stats["games"]
        console.log(playeresp, age, name, nationality, total, position, appearences)
        playerInfo.checkpos();
    },
    fetchAttackerInfo: function (data) {

    },

    fetchMidfielderInfo: function (data) {

    },

    fetchDefenderInfo: function (data) {

    },

    fetchGoalkeeperInfo: function (data) {

    },

    search: function () {
        this.fetchPlayerInfo(document.querySelector(".search-bar").value);
    },

    checkpos: function () {
        if (position == "Attacker") {
            playerInfo.fetchAttackerInfo()
        } else if (position == "Midfielder") {
            test = 150
        } else if (position == "Goalkeeper") {
            test = 100
        } else if (position == "Defender") {
            test = 250
        }
        console.log(test)

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