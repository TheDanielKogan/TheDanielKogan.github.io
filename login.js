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
let offset = 0;
for (let i = 0; i < account.length; i++) {
    if (!account[i]["block"].includes("P")) {
        offset += 1
    }
}


// ALL INFO TURNED INTO TEXT
// class name
let class1 = document.getElementById("class1")
let class2 = document.getElementById("class2")
let class3 = document.getElementById("class3")
let class4 = document.getElementById("class4")

class1.innerHTML = account[0+offset]["name"] + "<br />" + account[0+offset]["code"]
class2.innerHTML = account[1+offset]["name"] + "<br />" + account[1+offset]["code"]
class3.innerHTML = account[2+offset]["name"] + "<br />" + account[2+offset]["code"]
class4.innerHTML = account[3+offset]["name"] + "<br />" + account[3+offset]["code"]
//period
let p1 = document.getElementById("c1p")
let p2 = document.getElementById("c2p")
let p3 = document.getElementById("c3p")
let p4 = document.getElementById("c4p")

p1.innerHTML = account[0+offset]["block"]
p2.innerHTML = account[1+offset]["block"]
p3.innerHTML = account[2+offset]["block"]
p4.innerHTML = account[3+offset]["block"]
//room
p1 = document.getElementById("c1r")
p2 = document.getElementById("c2r")
p3 = document.getElementById("c3r")
p4 = document.getElementById("c4r")

p1.innerHTML = account[0+offset]["room"]
p2.innerHTML = account[1+offset]["room"]
p3.innerHTML = account[2+offset]["room"]
p4.innerHTML = account[3+offset]["room"]
//mark
p1 = document.getElementById("c1m")
p2 = document.getElementById("c2m")
p3 = document.getElementById("c3m")
p4 = document.getElementById("c4m")

if (account[0+offset]["overall_mark"] != null ) {p1.innerHTML = account[0+offset]["overall_mark"].toFixed(1) + "%"} else { p1.innerHTML = "N/A"}
if (account[1+offset]["overall_mark"] != null ) {p2.innerHTML = account[1+offset]["overall_mark"].toFixed(1) + "%"} else { p2.innerHTML = "N/A"}
if (account[2+offset]["overall_mark"] != null ) {p3.innerHTML = account[2+offset]["overall_mark"].toFixed(1) + "%"} else { p3.innerHTML = "N/A"}
if (account[3+offset]["overall_mark"] != null ) {p4.innerHTML = account[3+offset]["overall_mark"].toFixed(1) + "%"} else { p4.innerHTML = "N/A"}
//start
p1 = document.getElementById("c1s")
p2 = document.getElementById("c2s")
p3 = document.getElementById("c3s")
p4 = document.getElementById("c4s")

let ms = Date.parse(account[0+offset]["start_time"]) + 86400000
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

ms = Date.parse(account[0+offset]["end_time"]) + 86400000
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
let classname = document.getElementById("assignmentclass")
let classmark = document.getElementById("assignmark")

as1.innerHTML = 'Click Here(' + account[0+offset]["assignments"].length + ")"
as2.innerHTML = 'Click Here(' + account[1+offset]["assignments"].length + ")"
as3.innerHTML = 'Click Here(' + account[2+offset]["assignments"].length + ")"
as4.innerHTML = 'Click Here(' + account[3+offset]["assignments"].length + ")"
let currentclass = 0;
function displayAssignments(classnum) {
    currentclass = classnum
    for (let j = 0; j < account[classnum]["assignments"].length; j++) {
        let newrow = document.createElement("tr")
        thetable.appendChild(newrow)
        
        for (let i = 0; i < 6; i++) {
            let newtext = document.createElement("td")
            if (i == 0) {newtext.innerHTML = account[classnum]["assignments"][i]["name"]}
            else if (i == 1){if (account[classnum]["assignments"][j]["KU"] != undefined) { newtext.innerHTML = account[classnum]["assignments"][j]["KU"][0]["get"] + "/" + account[classnum]["assignments"][j]["KU"][0]["total"] + "<br /> Weight: " + account[classnum]["assignments"][j]["KU"][0]["weight"]} }
            else if (i == 2){if (account[classnum]["assignments"][j]["T"] != undefined) { newtext.innerHTML = account[classnum]["assignments"][j]["T"][0]["get"] + "/" + account[classnum]["assignments"][j]["T"][0]["total"] + "<br /> Weight: " + account[classnum]["assignments"][j]["T"][0]["weight"]}} 
            else if (i == 3){if (account[classnum]["assignments"][j]["C"] != undefined) { newtext.innerHTML = account[classnum]["assignments"][j]["C"][0]["get"] + "/" + account[classnum]["assignments"][j]["C"][0]["total"] + "<br /> Weight: " + account[classnum]["assignments"][j]["C"][0]["weight"]} }
            else if (i == 4){if (account[classnum]["assignments"][j]["A"] != undefined) { newtext.innerHTML = account[classnum]["assignments"][j]["A"][0]["get"] + "/" + account[classnum]["assignments"][j]["A"][0]["total"] + "<br /> Weight: " + account[classnum]["assignments"][j]["A"][0]["weight"]} }
            else if (i == 5){if (account[classnum]["assignments"][j]["O"] != undefined) { newtext.innerHTML = account[classnum]["assignments"][j]["O"][0]["get"] + "/" + account[classnum]["assignments"][j]["O"][0]["total"] + "<br /> Weight: " + account[classnum]["assignments"][j]["O"][0]["weight"]} }
            newrow.appendChild(newtext)
        }
    }
    classname.innerHTML = account[classnum]["name"]
    if (account[classnum]["overall_mark"] != null) {classmark.innerHTML = "Overall Mark: " + account[classnum]["overall_mark"].toFixed(1) + "%"}
    else {classmark.textContent = "Overall Mark: N/A"}
}

as1.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(0+offset)
}
as2.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(1+offset)
}
as3.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(2+offset)
}
as4.onclick = () => {
    table.style.display = "none"
    astable.style.display = "block"
    displayAssignments(3+offset)
}

let backbtn = document.getElementById("backbtn")
backbtn.onclick = () => {
    astable.style.display = "none"
    table.style.display = "block"
    for(let i = 0; i < thetable.childNodes.length; i++) {
        if (thetable.lastChild.nodeName == "TR"){
            thetable.removeChild(thetable.lastChild)
        }
    }
}

// fake assignment

let fake = document.getElementById("fakebutton")
let final = document.getElementById("finalmark")

setInterval(() => {
    if (parseFloat(final.value) > -1) {
        final.style.borderColor = "lightgreen"
    }
    else {
        final.style.borderColor="red"
    }
}, 100);

fake.onclick = function(obj) {
    let aname = document.getElementById("aname")
    
    if (aname.value != "" && final.value != "" && parseFloat(final.value) >= 0) {
        let newrow = document.createElement("tr")
        thetable.appendChild(newrow)
        for (let i = 0; i < 6; i++) {
            let newtext = document.createElement("td")
            newtext.style.background = "darkgray"
            if (i == 0) {newtext.innerHTML = aname.value + " <br /> " + final.value + "%"}
            if (i == 1) {newtext.innerText = ""}
            if (i == 2) {newtext.innerText = ""}
            if (i == 3) {newtext.innerText = ""}
            if (i == 4) {newtext.innerText = ""}
            if (i == 5) {newtext.innerText = ""}
            newrow.append(newtext)
        }
        let mark
        let prevmark = classmark.textContent.split(' ')[2].replace("%","")
        if (prevmark != "N/A") {
            mark = (parseFloat(prevmark) + parseFloat(final.value)) / 2
        }
        else {
            mark = final.value
        }
        classmark.textContent = "Overall Mark: " + mark + "%"
        aname.value = ""
        final.value = ""
    }
    
    

}
