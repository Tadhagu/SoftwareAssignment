let id = 100
//declaring the variable "id" outside of every function to make it a global function, 100 is just a placeholder value
let playeresp = "placeholder"
//declaring the variable "playeresp" outside of every function to make it a global function
let stats = "placeholder"
//declaring the variable "stats" outside of every function to make it a global function
let position = "placeholder"
//declaring the variable "position" outside of every function to make it a global function
let playerInfo = {
    //declaring the main function that everything falls under
    fetchPlayerInfo: function (nameofplayer) {
        //declaring the first function to fetch the basic info of the team, it takes in nameofplayer which is what the user puts into the search bar
        fetch("https://v3.football.api-sports.io/players?league=39&search=" + nameofplayer, {
            //calling the api, the last part of the link is replaced with the variable nameofteam
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "aefedc74219709b46c5b8bcded1a0d04"
            }
        }).then(response => response.json()
        ).then((data) => this.displayPlayerInfo(data))
            //calling the next function to display all the data called
            .catch(error => alert(error))
            //showing the error in the web browser itself

    },
    displayPlayerInfo: function (data) {
        //declaring the next function to display all the data called, it takes in the parameter data which is the api's response from the last function
        document.querySelector(".stats").classList.remove("loading");
        //selecting the HTML element name stats loading and removing the loading part
        //this makes the text change fron what is in the "stats loading" element to just the "stats" element
        playeresp = data['response']
        //declaring the actual data part of the response as a variable so I can easily call it
        //the response has alot of technincal things in it like errors and page numbers so its good to distinguish the actual data
        //instead of using let I just declared it without it so I could use it in another function
        let {age, name, nationality} = playeresp[0]["player"]
        //getting the data from the nested arrays, as "name" "logo" and "country" are all located at the coordinates I called
        stats = playeresp[0]["statistics"][0]
        //declaring a part of the response to make it easier for me to call later on
        let {logo} = stats["team"]
        //getting the logo from the nested array from the coordinates I called
        id = stats["team"]["id"]
        //id is located in the same place as the other arrays, however I have to call it differently
        // I cannot use let {} as it does not change the actual variable "id", so I call it like this to be able to use it in the global function
        position = stats["games"]["position"]
        //declaring the position without let so I can use it in another function
        let {appearences} = stats["games"];
        //getting the player's appearances from the nested array from the coordinates I called
        document.querySelector(".team_icon").src = logo
        //selecting the team_icon element and setting it to the logo variable from the API response
        document.querySelector(".team_name").innerText = name;
        //selecting the team_name element and setting it to the name variable from the API response
        document.getElementById("apps_text").innerHTML = appearences;
        //selecting the text for the player's stats in the HTML and setting it to the variable "appearances"
        document.getElementById("age_text").innerHTML = age;
        //selecting the text for the player's stats in the HTML and setting it to the variable "age"
        document.getElementById("pos_text").innerHTML = position;
        //selecting the text for the player's stats in the HTML and setting it to the variable "position"
        document.getElementById("nat_text").innerHTML = nationality;
        //selecting the text for the player's stats in the HTML and setting it to the variable "nationality"
        console.log(playeresp, age, name, nationality, position, appearences, id)
        playerInfo.checkpos();
        //calling the function to check the player's position and update accordingly
        getBg.fetchBg();
        //calling the function to get the background for the player's team
    },
    fetchAttackerInfo: function () {
        //defining a function to occur when the player's position is "attacker"
        document.getElementById("attacker_text").style.display = "block";
        //selecting the attacker text's properties and changing its display value from none to block which shows the text
        document.getElementById("midfielder_text").style.display = "none";
        //selecting the midfielder text's properties and making sure its display value stays at none
        document.getElementById("defender_text").style.display = "none";
        //selecting the defender text's properties and making sure its display value stays at none
        document.getElementById("goalkeeper_text").style.display = "none";
        //selecting the goalkeeper text's properties and making sure its display value stays at none
        //the 3 lines above make sure that only the attacker's text is shown if the position is attacker
        let {total, assists} = stats["goals"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        let {attempts, success} = stats["dribbles"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        document.getElementById("goals_text").innerHTML = total;
        //selecting the text for attacking stats in the HTML and setting it to the variable "total"
        document.getElementById("a_text").innerHTML = assists;
        //selecting the text for attacking stats in the HTML and setting it to the variable "assists"
        document.getElementById("drib_text").innerHTML = attempts;
        //selecting the text for attacking stats in the HTML and setting it to the variable "attempts"
        document.getElementById("completed_text").innerHTML = success;
        //selecting the text for attacking stats in the HTML and setting it to the variable "success"
        console.log(total, assists)
    },

    fetchMidfielderInfo: function () {
        //defining a function to occur when the player's position is "midfielder"
        document.getElementById("midfielder_text").style.display = "block";
        //selecting the attacker text's properties and changing its display value from none to block which shows the text
        document.getElementById("defender_text").style.display = "none";
        //selecting the defender text's properties and making sure its display value stays at none
        document.getElementById("goalkeeper_text").style.display = "none";
        //selecting the goalkeeper text's properties and making sure its display value stays at none
        document.getElementById("attacker_text").style.display = "none";
        //selecting the attacker text's properties and making sure its display value stays at none
        let {assists} = stats["goals"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        let {total, key, accuracy} = stats["passes"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        let {attempts, success} = stats["dribbles"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        document.getElementById("assists_text").innerHTML = assists;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "assists"
        document.getElementById("acc_text").innerHTML = accuracy;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "accuracy"
        document.getElementById("passes_text").innerHTML = total;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "total"
        document.getElementById("key_text").innerHTML = key;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "key"
        document.getElementById("drib_text2").innerHTML = attempts;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "attempts"
        document.getElementById("completed_text2").innerHTML = success;
        //selecting the text for midfielder stats in the HTML and setting it to the variable "success"
        console.log(total, assists, key, accuracy, attempts, success)
    },

    fetchDefenderInfo: function () {
        //defining a function to occur when the player's position is "defender"
        document.getElementById("defender_text").style.display = "block";
        //selecting the defender text's properties and changing its display value from none to block which shows the text
        document.getElementById("midfielder_text").style.display = "none";
        //selecting the midfielder text's properties and making sure its display value stays at none
        document.getElementById("goalkeeper_text").style.display = "none";
        //selecting the goalkeeper text's properties and making sure its display value stays at none
        document.getElementById("attacker_text").style.display = "none";
        //selecting the attacker text's properties and making sure its display value stays at none
        let {won} = stats["duels"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        let {total, blocks, interceptions} = stats["tackles"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        let {yellow, red} = stats["cards"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        document.getElementById("duels_text").innerHTML = won;
        //selecting the text for defender stats in the HTML and setting it to the variable "won"
        document.getElementById("tackles_text").innerHTML = total;
        //selecting the text for defender stats in the HTML and setting it to the variable "total"
        document.getElementById("inter_text").innerHTML = interceptions;
        //selecting the text for defender stats in the HTML and setting it to the variable "interceptions"
        document.getElementById("yellows_text").innerHTML = yellow;
        //selecting the text for defender stats in the HTML and setting it to the variable "yellow"
        document.getElementById("reds_text").innerHTML = red;
        //selecting the text for defender stats in the HTML and setting it to the variable "red"
        console.log(won, total, blocks, interceptions, yellow, red)
    },

    fetchGoalkeeperInfo: function () {
        //defining a function to occur when the player's position is "goalkeeper"
        document.getElementById("goalkeeper_text").style.display= "block";
        //selecting the goalkeeper text's properties and changing its display value from none to block which shows the text
        document.getElementById("midfielder_text").style.display = "none";
        //selecting the midfielder text's properties and making sure its display value stays at none
        document.getElementById("defender_text").style.display = "none";
        //selecting the defender text's properties and making sure its display value stays at none
        document.getElementById("attacker_text").style.display = "none";
        //selecting the attacker text's properties and making sure its display value stays at none
        let {saves} = stats["goals"]
        //getting the data from the nested arrays, which are all located at the coordinates I called
        document.getElementById("saves_text").innerText = saves;
        //selecting the text for goalkeeper stats in the HTML and setting it to the variable "saves"
        console.log(saves)
    },

    search: function () {
        this.fetchPlayerInfo(document.querySelector(".search-bar").value);
    },

    checkpos: function () {
        //creating a function to check the position of the players and change the stats accordingly
        //credit to Ms Bell for structuring and fixing errors in this function
        if (position == 'Attacker') {
            playerInfo.fetchAttackerInfo()
            //calling the function to change the stats to the Attacker stats
        } else if (position == "Midfielder") {
            playerInfo.fetchMidfielderInfo()
            //calling the function to change the stats the Midfielder stats
        } else if (position == "Defender") {
            playerInfo.fetchDefenderInfo()
            //calling the function to change the stats to the Defenders stats
        } else if (position == "Goalkeeper") {
            playerInfo.fetchGoalkeeperInfo()
            //calling the function to change the stats to the Goalkeeper stats
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