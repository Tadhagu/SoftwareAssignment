let id = 100
let test = 200
let position = "placeholder"
let playeresp = "placeholder"
let stats = "placeholder"
let playerInfo = {
    fetchPlayerInfo: function (nameofplayer) {
        fetch("https://v3.football.api-sports.io/players?league=39&search=" + nameofplayer, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayPlayerInfo(data))
            .catch(error => alert(error))

    },
    displayPlayerInfo: function (data) {
        document.querySelector(".stats").classList.remove("loading");
        playeresp = data['response']
        let {age, name, nationality} = playeresp[0]["player"]
        stats = playeresp[0]["statistics"][0]
        let {logo} = stats["team"]
        id = stats["team"]["id"]
        let {accuracy, passes} = stats["passes"]
        position = stats["games"]["position"]
        let {appearences} = stats["games"];
        document.querySelector(".team_icon").src = logo
        document.querySelector(".team_name").innerText = name;
        document.getElementById("apps_text").innerHTML = appearences;
        document.getElementById("age_text").innerHTML = age;
        document.getElementById("pos_text").innerHTML = position;
        document.getElementById("nat_text").innerHTML = nationality;
        console.log(playeresp, age, name, nationality, position, appearences, id)
        playerInfo.checkpos();
        getBg.fetchBg();
    },
    fetchAttackerInfo: function () {
        document.getElementById("attacker_text").style.display = "block";
        document.getElementById("midfielder_text").style.display = "none";
        document.getElementById("defender_text").style.display = "none";
        document.getElementById("goalkeeper_text").style.display = "none";
        let {total, assists} = stats["goals"]
        let {attempts, success} = stats["dribbles"]
        document.getElementById("goals_text").innerHTML = total;
        document.getElementById("a_text").innerHTML = assists;
        document.getElementById("drib_text").innerHTML = attempts;
        document.getElementById("completed_text").innerHTML = success;
        console.log(total, assists)
    },

    fetchMidfielderInfo: function () {
        document.getElementById("midfielder_text").style.display = "block";
        document.getElementById("defender_text").style.display = "none";
        document.getElementById("goalkeeper_text").style.display = "none";
        document.getElementById("attacker_text").style.display = "none";
        let {assists} = stats["goals"]
        let {total, key, accuracy} = stats["passes"]
        let {attempts, success} = stats["dribbles"]
        document.getElementById("assists_text").innerHTML = assists;
        document.getElementById("acc_text").innerHTML = accuracy;
        document.getElementById("passes_text").innerHTML = total;
        document.getElementById("key_text").innerHTML = key;
        document.getElementById("drib_text2").innerHTML = attempts;
        document.getElementById("completed_text2").innerHTML = success;
        console.log(total, assists, key, accuracy, attempts, success)
    },

    fetchDefenderInfo: function () {
        document.getElementById("defender_text").style.display = "block";
        document.getElementById("midfielder_text").style.display = "none";
        document.getElementById("goalkeeper_text").style.display = "none";
        document.getElementById("attacker_text").style.display = "none";
        let {won} = stats["duels"]
        let {total, blocks, interceptions} = stats["tackles"]
        let {yellow, red} = stats["cards"]
        document.getElementById("duels_text").innerHTML = won;
        document.getElementById("tackles_text").innerHTML = total;
        document.getElementById("inter_text").innerHTML = interceptions;
        document.getElementById("yellows_text").innerHTML = yellow;
        document.getElementById("reds_text").innerHTML = red;
        console.log(won, total, blocks, interceptions, yellow, red)
    },

    fetchGoalkeeperInfo: function () {
        document.getElementById("goalkeeper_text").style.display="block"
        document.getElementById("midfielder_text").style.display = "none";
        document.getElementById("defender_text").style.display = "none";
        document.getElementById("attacker_text").style.display = "none";
        let {saves} = stats["goals"]
        document.getElementById("saves_text").innerText = saves;
        console.log(saves)
    },

    search: function () {
        this.fetchPlayerInfo(document.querySelector(".search-bar").value);
    },

    checkpos: function () {
        if (position == 'Attacker') {
            playerInfo.fetchAttackerInfo()
        } else if (position == "Midfielder") {
            playerInfo.fetchMidfielderInfo()
        } else if (position == "Defender") {
            playerInfo.fetchDefenderInfo()
        } else if (position == "Goalkeeper") {
            playerInfo.fetchGoalkeeperInfo()
        }
        console.log(position)
    },
};

    document.querySelector(".search button").addEventListener("click", function () {
        playerInfo.search();
    })

    document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            playerInfo.search();
        }
    })

let getBg = {
    fetchBg: function () {
        fetch("https://v3.football.api-sports.io/teams?id=" + id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayBg(data))
            .catch(error => alert(error))
    },
    displayBg: function (data) {
        let teamresp = data['response']
        let {image} = teamresp[0]['venue'];
        document.body.style.backgroundImage = "url(" + image + ")"
        },
    };
playerInfo.fetchPlayerInfo("rashford")