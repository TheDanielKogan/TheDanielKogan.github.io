let logout = document.getElementById("logout")
let username = localStorage.getItem("username")
localStorage.removeItem("username")
let account
if (localStorage.getItem("msg") == "success") {
    window.localStorage.setItem("msg", "")
    account = JSON.parse(window.localStorage.getItem("json"))
    window.localStorage.removeItem("json")
}
else {
    window.location.href = "index.html"           
}
logout.textContent = "Logged in as: " + username

let logoutbtn = document.getElementById("logoutbtn")
logoutbtn.onclick = () => {
    window.location.href = "index.html"
}

// ALL INFO TURNED INTO TEXT
// class name
let class1 = document.getElementById("class1")
let class2 = document.getElementById("class2")
let class3 = document.getElementById("class3")
let class4 = document.getElementById("class4")

class1.innerHTML = account[0]["name"]
class2.innerHTML = account[1]["name"]
class3.innerHTML = account[2]["name"]
class4.innerHTML = account[3]["name"]
//period
let p1 = document.getElementById("c1p")
let p2 = document.getElementById("c2p")
let p3 = document.getElementById("c3p")
let p4 = document.getElementById("c4p")

p1.innerHTML = account[0]["block"]
p2.innerHTML = account[1]["block"]
p3.innerHTML = account[2]["block"]
p4.innerHTML = account[3]["block"]
//room
p1 = document.getElementById("c1r")
p2 = document.getElementById("c2r")
p3 = document.getElementById("c3r")
p4 = document.getElementById("c4r")

p1.innerHTML = account[0]["room"]
p2.innerHTML = account[1]["room"]
p3.innerHTML = account[2]["room"]
p4.innerHTML = account[3]["room"]
//mark
p1 = document.getElementById("c1m")
p2 = document.getElementById("c2m")
p3 = document.getElementById("c3m")
p4 = document.getElementById("c4m")

if (account[0]["overall_mark"] != null ) {p1.innerHTML = account[0]["overall_mark"].toFixed(1) + "%"} else { p1.innerHTML = "N/A"}
if (account[1]["overall_mark"] != null ) {p2.innerHTML = account[1]["overall_mark"].toFixed(1) + "%"} else { p2.innerHTML = "N/A"}
if (account[2]["overall_mark"] != null ) {p3.innerHTML = account[2]["overall_mark"].toFixed(1) + "%"} else { p3.innerHTML = "N/A"}
if (account[3]["overall_mark"] != null ) {p4.innerHTML = account[3]["overall_mark"].toFixed(1) + "%"} else { p4.innerHTML = "N/A"}
//start
p1 = document.getElementById("c1s")
p2 = document.getElementById("c2s")
p3 = document.getElementById("c3s")
p4 = document.getElementById("c4s")

let ms = Date.parse(account[0]["start_time"]) + 86400000
let x = new Date(ms)
let month = x.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})

p1.innerHTML = month
p2.innerHTML = month
p3.innerHTML = month
p4.innerHTML = month
//end
p1 = document.getElementById("c1e")
p2 = document.getElementById("c2e")
p3 = document.getElementById("c3e")
p4 = document.getElementById("c4e")

ms = Date.parse(account[0]["end_time"]) + 86400000
x = new Date(ms)
month = x.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})

p1.innerHTML = month
p2.innerHTML = month
p3.innerHTML = month
p4.innerHTML = month

//                  Assignments

let as1 = document.getElementById("c1a")
let as2 = document.getElementById("c2a")
let as3 = document.getElementById("c3a")
let as4 = document.getElementById("c4a")
let table = document.getElementById("table")
let astable = document.getElementById("assignmenttable")
let thetable = document.getElementById("thetable")

function displayAssignments(classnum) {
    for (let i = 0; i < account[classnum]["assignments"].length; i++) {
        let newrow = document.createElement("tr")
        thetable.appendChild(newrow)
        for (let i = 0; i < 7; i++) {
            let newtext = document.createElement("td")
            if (i == 0) {newtext.innerHTML = account[classnum]["assignments"][i]["name"]}
            else if (i == 1){ newtext.innerHTML = account[classnum]["assignments"][i]["F"]["get"] + "/" + account[classnum]["assignments"][i]["F"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["F"]["weight"]}
            else if (i == 2){newtext.innerHTML = account[classnum]["assignments"][i]["KU"]["get"] + "/" + account[classnum]["assignments"][i]["KU"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["KU"]["weight"]} 
            else if (i == 3){newtext.innerHTML = account[classnum]["assignments"][i]["T"]["get"] + "/" + account[classnum]["assignments"][i]["T"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["T"]["weight"]} 
            else if (i == 4){newtext.innerHTML = account[classnum]["assignments"][i]["C"]["get"] + "/" + account[classnum]["assignments"][i]["C"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["C"]["weight"]} 
            else if (i == 5){newtext.innerHTML = account[classnum]["assignments"][i]["A"]["get"] + "/" + account[classnum]["assignments"][i]["A"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["A"]["weight"]} 
            else if (i == 6){newtext.innerHTML = account[classnum]["assignments"][i]["O"]["get"] + "/" + account[classnum]["assignments"][i]["O"]["total"] + "<br /> Weight: " + account[classnum]["assignments"][i]["O"]["weight"]} 
            
            newrow.appendChild(newtext)
        }
    }
}

as1.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(0)
}
as2.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(1)
}
as3.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(2)
}
as4.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(3)
}

let backbtn = document.getElementById("backbtn")
backbtn.onclick = () => {
    astable.style.display = "none"
    table.style.display = "block"
}