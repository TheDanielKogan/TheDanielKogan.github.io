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
    while (insidetable.lastChild.nodeName != "TBODY") {
        
        insidetable.removeChild(insidetable.lastChild)

        
    }
    type = [
        "name", "KU", "T", "C", "A"
    ]
    for (let i = 0; i < account[classIdx]['assignments'].length; i++) {
        let newrow = document.createElement("tr")
        
        
        

        for (let j = 0; j < 5; j++) {
            let newinfo = document.createElement('td')
            if (type[j] != "name") {
                if (account[classIdx]['assignments'][i][type[j]] != undefined) {
                    newinfo.innerHTML = (account[classIdx]['assignments'][i][type[j]][0]["get"]/account[classIdx]['assignments'][i][type[j]][0]["total"]*100).toFixed(0) + "%<br>Weight: " + account[classIdx]['assignments'][i][type[j]][0]["weight"]
                    if (account[classIdx]['assignments'][i][type[j]][0]["finished"] == false) {
                        newinfo.innerHTML = " /" + account[classIdx]['assignments'][i][type[j]][0]["total"] + "<br>Weight: " + account[classIdx]['assignments'][i][type[j]][0]["weight"]
                        newinfo.style.background = "rgb(255, 200, 200)"
                    }
                    
                } 
                else {
                    newinfo.innerHTML = " "
                } 
            }
            else {
                newinfo.innerHTML = account[classIdx]['assignments'][i]['name']
            }
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
let infocontainer = document.getElementById("infocontainer")
let opener = document.getElementById("opener")
let opened = true
opener.onclick = () => {
    if (opened == true) {
        tablecontainer.style.left = "5em"
        sidebar.style.left = "-10em"
        infocontainer.style.marginLeft = "5em"
        opener.innerHTML = "&triangleright;"
        opened = false
    }
    else {
        infocontainer.style.marginLeft = "13em"
        tablecontainer.style.left = "15em"
        sidebar.style.left = "0em"
        opener.innerHTML = "&triangleleft;"
        opened = true
    }
}
