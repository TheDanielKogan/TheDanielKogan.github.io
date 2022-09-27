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
let table = document.getElementById("table")
let astable = document.getElementById("assignmenttable")
let classtable = document.getElementById("classtable")
for (let k = 0; k < account.length; k++) {
    let row = document.createElement("tr")
    classtable.appendChild(row)
    for (let q = 0; q < 7; q++) {
        let newdata = document.createElement("td")
        let starttime = Date.parse(account[k]["start_time"]) + 86400000
        let date = new Date(starttime)
        let month = date.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})
        if (q == 0) {newdata.innerHTML = account[k]["name"] + "<br />" + account[k]["code"]}
        if (q == 1) {newdata.innerHTML = account[k]["block"]}
        if (q == 2) {newdata.innerHTML = account[k]["room"]}
        if (q == 3) {if (account[k]["overall_mark"] != null) {newdata.innerHTML = account[k]["overall_mark"].toFixed(1) + "%"} else {newdata.innerHTML = "N/A"}}
        if (q == 4) {newdata.innerHTML = month}
        starttime = Date.parse(account[k]["end_time"]) + 86400000
        date = new Date(starttime)
        month = date.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})
        if (q == 5) {newdata.innerHTML = month}
        let newdiv = document.createElement("div")
        if (q == 6) {newdiv.innerText = "Click Here(" + account[k]["assignments"].length + ")" ; newdiv.className = "assignment"; newdata.appendChild(newdiv); 
        newdata.onclick = () => {
            table.style.display = "none"
            astable.style.display = "block"
            displayAssignments(k)
        }}
        row.appendChild(newdata)
    }
}

//                  Assignments




let thetable = document.getElementById("thetable")
let classname = document.getElementById("assignmentclass")
let classmark = document.getElementById("assignmark")

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
