let id = 100
let test = 200
let position = "placeholder"
let playeresp = "placeholder"
let stats = "placeholder"
let playerInfo = {
    fetchPlayerInfo: function (nameofplayer) {
        fetch("https://v3.football.api-sports.io/players?league=61&search=" + nameofplayer, {
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
        document.querySelector(".stats").classList.remove("loading");
        playeresp = data['response']
        let {age, name, nationality, photo} = playeresp[0]["player"]
        stats = playeresp[0]["statistics"][0]
        let {id, logo} = stats["team"]
        let {accuracy, passes} = stats["passes"]
        position = stats["games"]["position"]
        let {appearences} = stats["games"];
        document.querySelector(".player_icon").src = photo
        document.querySelector(".team_icon").src = logo
        document.querySelector(".team_name").innerText = name;
        document.getElementById("apps_text").innerHTML = appearences;
        document.getElementById("age_text").innerHTML = age;
        document.getElementById("pos_text").innerHTML = position;
        document.getElementById("nat_text").innerHTML = nationality;
        console.log(playeresp, age, name, nationality, position, appearences)
        playerInfo.checkpos();
    },
    fetchAttackerInfo: function (data) {
        document.querySelector(".attacker").classList.remove("check")
        let {total, assists} = stats["goals"]
        let {attempts, success} = stats["dribbles"]
        console.log(total, assists)
    },

    fetchMidfielderInfo: function (data) {
        document.querySelector(".attacker").classList.remove("check")
        let {assists} = stats["goals"]
        let {total, key, accuracy} = stats["passes"]
        let {attempts, success} = stats["dribbles"]
        console.log(total, assists, key, accuracy, attempts, success)
    },

    fetchDefenderInfo: function (data) {
        document.querySelector(".attacker").classList.remove("check")
        let {won} = stats["duels"]
        let {total, blocks, interceptions} = stats["tackles"]
        let {yellow, red} = stats["cards"]
        console.log(won, total, blocks, interceptions, yellow, red)
    },

    fetchGoalkeeperInfo: function (data) {
        document.querySelector(".attacker").classList.remove("check")
        let {saves} = stats["goals"]
        console.log(saves)
    },

    search: function () {
        this.fetchPlayerInfo(document.querySelector(".search-bar").value);
    },

    checkpos: function (position) {
        if (position == "Attacker") {
            playerInfo.fetchAttackerInfo()
        } else if (position == "Midfielder") {
            playerInfo.fetchMidfielderInfo()
        } else if (position == "Defender") {
            playerInfo.fetchDefenderInfo()
        } else if (position == "Goalkeeper") {
            playerInfo.fetchGoalkeeperInfo()
        }
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
playerInfo.fetchPlayerInfo("mbappe")