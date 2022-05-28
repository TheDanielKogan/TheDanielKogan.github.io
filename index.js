let textarea = document.getElementById("cmdline");
let page = document;
let cursorpos = 157;
let timesclicked = 0;
let additional = 0;
let old = 0;

textarea.onselectstart = function(event) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      } else {
        // to call preventDefault() on it.
        console.warn(`The following event couldn't be canceled:`);
        
      }
}

page.onkeydown = function(keys) {
    
    textarea.style.visibility = "visible";
    textarea.focus();
    window.scrollTo(0, document.body.scrollHeight)

    
    
    
   
   
   old = textarea.value.length;
   
    
    
    
}

function spam(int) {
    for (let i = 0; i < int; i++) {
        var newp = document.createElement("div");
        newp.textContent = "spam"
        document.getElementById("trm").appendChild(newp);
    }
}

function addLine(text) {
    if (text != "br") {
    var newp = document.createElement("div");
    
    newp.textContent = text
        
    document.getElementById("trm").appendChild(newp);
    }
    else {
        var newp = document.createElement("br");
    
    
        
        document.getElementById("trm").appendChild(newp);
    }
}

function checkCommands(text) {
    text = text.trim();
    if (text == "/help") {
        addLine("br")
        addLine("'/help' - Opens this help menu")
        addLine("'/spam <number>' - Spams the chat however many times you want")
        addLine("'/clear' - Clears the terminal")
        addLine("br")
    }
    else if (text == "/spam") {
        addLine("br")
        addLine("Please do '/spam <number>' to complete the command")
        addLine("br")
    }
    else if (text == "/clear") {
        let term = document.getElementById("trm")
        let prevchild = term.lastChild;
        let header = document.createElement("p")
        header.textContent = "Type '/help' for help"
        term.innerHTML = "";
        term.appendChild(header)
    }
    else {
        addLine("br")
        addLine("Unknown command. Type '/help' for help")
        addLine("br")
        
    }
}

textarea.onkeyup = function(keys) {
    
    let test = document.getElementById("test");
    if (keys.keyCode == 37) {
        
        if (cursorpos > 167) {
            additional += -9.9;
            timesclicked += -1
        }
    }
    if (keys.keyCode == 39) {
        
        
        if (timesclicked < textarea.value.length) {
            additional += 9.9;
            timesclicked += 1
        }
        //alert(cursorpos + " | "+ cursor.style.left)
   }
    if (keys.keyCode == 13) {
        
       
        let text = document.getElementById("cmdline");
        
        
        
        var newp = document.createElement("div");
        newp.textContent = text.value
        
        document.getElementById("trm").appendChild(newp);
        checkCommands(text.value)
        if (textarea.value.includes("/spam")) {
            let splitter = textarea.value.split(' ');
            if (splitter.length > 1) {
                spam(splitter[1])
            }
        } 
       
        textarea.value = "";
        window.scrollTo(0, document.body.scrollHeight)
        
    }
    if (keys.keyCode != 32 || keys.keyCode != 37) {
        if (old != textarea.value.length) {
            timesclicked += 1;
        }
    }
    
    
    
    
    
    test.textContent = "terminal@viewer~" + textarea.value;
    cursorpos = 167 + textarea.value.length * 9.9 + additional
    let cursor = document.getElementById("mover");
    cursor.style.left = cursorpos + "px";
    
    //alert(keys.keyCode)
}


    
