let btn = document.getElementById("submit")
let user = document.getElementById("username")
let pass = document.getElementById("current-password")
let msg = document.getElementById("msg")
let remember = document.getElementById("remember")
let form = document.getElementById("form")
if (window.localStorage.getItem("msg") != "success") {
    msg.textContent = window.localStorage.getItem("msg");
    window.localStorage.setItem("msg", "")
    setTimeout(() => {
        
        msg.textContent = ""
    }, 3000);
} else {
    window.location.href = "login.html"
    
}
function showPassword(self) {
    if (pass.type == 'password') {
        pass.type = "text"
        self.src = "hide.png"
    }
    else {
        pass.type = 'password'
        self.src = "show.png"
    }
}


btn.onclick = function(self) {
    msg.textContent = "Loading..."
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.pegasis.site/public/yrdsb_ta/getmark_v2");
    xhr.onload = () =>  {
        if (xhr.status == 401) {
            
            window.localStorage.setItem("msg", "Incorrect Password")
            location.reload()
        }
        else if (xhr.status == 400) {
            window.localStorage.setItem("msg", "There's an error on our side, Sorry!")
            location.reload()
        }
        else if (xhr.status == 500) {
            window.localStorage.setItem("msg", "Oops, error!")
            location.reload()
        }
        else if (xhr.status == 503) {
            window.localStorage.setItem("msg", "Teachassist seems to be down!")
            location.reload()
        }
        else {
            window.localStorage.setItem("msg", "success")
            window.localStorage.setItem("json", xhr.responseText)
            window.localStorage.setItem("username", user.value)
            location.reload()
        }
        return false
    }
    let data = {
        "number": user.value,
        "password": pass.value
    }
    let sendingData = JSON.stringify(data)
    xhr.send(sendingData)
}

let shape1 = document.getElementById("first")
let shape2 = document.getElementById("second")
let shape3 =document.getElementById("third")
let shape4 =document.getElementById("fourth")
window.onload = () => {
    Anim()
}

setInterval(() => {
    Anim()
}, 10000);

let array = [shape1, shape2, shape3, shape4]
function Anim() {
    const h = window.innerHeight - 300
    const w = window.innerWidth - 300
    
    for (let i = 0; i < 4; i++) {
        const currentheight = getComputedStyle(array[i])
        const currentwidth = getComputedStyle(array[i])
        const newheight = Math.floor(Math.random() * h)
        const newwidth = Math.floor(Math.random() * w)
        const timing = {
            duration: 10000,
        }
        const animation = [
            {top: currentheight.top, left: currentwidth.left},
            {top: newheight + "px", left: newwidth + "px"},
            
        ]
        array[i].animate(animation,timing)
        
    }
    
    
    
}



