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


function LogIn(){
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


