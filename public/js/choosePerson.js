var personChosen

const room = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(room.chatroom)

const socket = io()

function preload() {
    
}

function setup() {
    romeoImg = createImg('assets/romeo-unactivated.png', 'romeo image').mousePressed(romeoPressed)
    julietImg = createImg('assets/juliet-unactivated.png', 'juliet image').mousePressed(julietPressed)
    submitImg = createImg('assets/letsgo-btn.png', 'submitbutton').mousePressed(submitPressed).hide()
}

function draw() {
    createCanvas(windowWidth, windowHeight)
    drawromeoandjuliet()
    drawSubmitButton()
}

function drawromeoandjuliet() {
    mainButtonSize = windowWidth*.35
    mainButtonY = windowHeight*.1

    romeoButtonX = windowWidth*.3-mainButtonSize/2,
    julietButtonX = windowWidth*.7-mainButtonSize/2,
    
    romeoImg.position(romeoButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
    julietImg.position(julietButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
}

function drawSubmitButton() {
    submitButtonX = windowWidth*.5-mainButtonSize/2,
    submitButtonY = mainButtonY + mainButtonSize*1.80 + windowHeight*0.05
    submitImg.position(submitButtonX, submitButtonY).size(mainButtonSize, mainButtonSize*0.275)
}

function romeoPressed(){
    if (personChosen == "juliet") {
        julietImg = createImg('assets/juliet-unactivated.png', 'juliet image')
            .position(julietButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80).mousePressed(julietPressed)
    }
    romeoImg = createImg('assets/romeo-activated.png', 'romeo image')
        .position(romeoButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
    personChosen = "romeo"
    submitImg.show()
    // document.getElementById("username").innerHTML = personChosen;
    console.log("romeo")
}

function julietPressed() {
    if (personChosen == "romeo") {
        romeoImg = createImg('assets/romeo-unactivated.png', 'romeo image')
        .position(romeoButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80).mousePressed(romeoPressed)
    }
    julietImg = createImg('assets/juliet-activated.png', 'juliet image')
            .position(julietButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
    personChosen = "juliet"
    submitImg.show()
    // document.getElementById("username").innerHTML = personChosen
    console.log("juliet")
}

function submitPressed(){
    
    // document.getElementById('username') = personChosen
    // document.getElementById('chatroom') = room.chatroom
    localStorage.setItem("submitName", personChosen)
    localStorage.setItem("submitRoom", room.chatroom)
    window.document.location = 'chat.html' + '?username=' + personChosen + '&chatroom=' + room.chatroom
    // socket.emit("joinRoom", chatForm)
    // document.getElementById("enterroom").submit()

}