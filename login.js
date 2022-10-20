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


// Class List Sidebar
let publicclassidx
let sidebar = document.getElementById("sidebar")
if (account != null) {
if (account.length > 0){
    let ul = sidebar.children[0]
    for (let i = 0; i < account.length; i++) {
        let container = document.createElement("div")
        container.className = "list-container"

        let newitem = document.createElement("li")
       
        newitem.setAttribute("classidx", i.toString())
        newitem.onclick = function() {changeInfo(newitem)}
        newitem.parent
        newitem.innerText = account[i]["name"]
        let progress = document.createElement("progress")
        progress.value = account[i]["overall_mark"]/100 ?? 0
        if (i == 0) {
            container.style.background = "rgb(175, 225, 175)"
            
        }
        container.appendChild(newitem)
        container.appendChild(progress)
        ul.appendChild(container)
    }
    publicclassidx = 0
}
}

function changeInfo(element) {
    for (let i = 0; i < element.parentElement.parentElement.children.length; i++) {
            element.parentElement.parentElement.children[i].style.background = ""
        
    }
    updateInfo(parseInt(element.getAttribute("classidx")))
    element.parentElement.style.background = "rgb(175, 225, 175)"
}

function updateInfo(classIdx) {
    if (account != null) {
    let code = document.getElementById("code")
    let period = document.getElementById("period")
    let room = document.getElementById("room")
    let mark = document.getElementById("mark")
    let starttime = document.getElementById("start")
    let endtime = document.getElementById("end")

    code.innerHTML = account[classIdx]["code"] ?? "N/A"
    period.innerHTML = account[classIdx]["block"] ?? "N/A"
    room.innerHTML = account[classIdx]["room"] ?? "N/A"
    let overallmark = account[classIdx]["overall_mark"]
    if (overallmark == undefined) {
        overallmark = "N/A"
    }
    else {
        overallmark = parseFloat(overallmark).toFixed(1) + "%"
    }
    mark.innerHTML = overallmark

    thedate = Date.parse(account[classIdx]["start_time"]) + 86400000
    thedate = new Date(thedate)
    readabledate = thedate.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})
    starttime.innerHTML = readabledate

    thedate = Date.parse(account[classIdx]["end_time"]) + 86400000
    thedate = new Date(thedate)
    readabledate = thedate.toLocaleString('default', {month: 'long', day: 'numeric', year: 'numeric'})
    endtime.innerHTML = readabledate

    changeAssignments(classIdx)
    }
}
updateInfo(0)

function changeAssignments(classIdx) {
    let insidetable = document.getElementById("table")
    for (let i = 0; i < insidetable.children.length; i++) {
        if (insidetable.lastChild.nodeName != "TBODY")
        insidetable.removeChild(insidetable.lastChild)
    }
    for (let i = 0; i < account[classIdx]['assignments'].length; i++) {
        let newrow = document.createElement("tr")
        let info = [
            account[classIdx]['assignments'][i]["name"],
            account[classIdx]['assignments'][i]['KU'][0]["get"] + "/" + account[classIdx]['assignments'][i]['KU'][0]["total"] + "<br>Weight: " + account[classIdx]['assignments'][i]['KU'][0]["weight"],
            account[classIdx]['assignments'][i]['T'][0]["get"] + "/" + account[classIdx]['assignments'][i]['T'][0]["total"] + "<br>Weight: " + account[classIdx]['assignments'][i]['T'][0]["weight"],
            account[classIdx]['assignments'][i]['C'][0]["get"] + "/" + account[classIdx]['assignments'][i]['C'][0]["total"] + "<br>Weight: " + account[classIdx]['assignments'][i]['C'][0]["weight"],
            account[classIdx]['assignments'][i]['A'][0]["get"] + "/" + account[classIdx]['assignments'][i]['A'][0]["total"] + "<br>Weight: " + account[classIdx]['assignments'][i]['A'][0]["weight"],
            
        ]
        for (let j = 0; j < 5; j++) {
            let newinfo = document.createElement('td')
            newinfo.innerHTML = info[j]
            newrow.appendChild(newinfo)
        }
        insidetable.appendChild(newrow)
    }
}

//logout btn

let logout = document.getElementById("logout")
logout.onclick = () => {
    window.location.href = "index.html"
}

// Sidebar open/close

let tablecontainer = document.getElementById("tablecontainer")
let opener = document.getElementById("opener")
let opened = true
opener.onclick = () => {
    if (opened == true) {
        tablecontainer.style.left = "5em"
        sidebar.style.left = "-10em"
        opener.innerHTML = "&triangleright;"
        opened = false
    }
    else {
        tablecontainer.style.left = "15em"
        sidebar.style.left = "0em"
        opener.innerHTML = "&triangleleft;"
        opened = true
    }
}
