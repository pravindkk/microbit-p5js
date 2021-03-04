var personChosen

const room = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(room.chatroom)

const socket = io()

function preload() {
    
}

function setup() {
    selectRoleImg = createImg('assets/select-your-role.png', 'select your role image')
    romeoImg = createImg('assets/romeo-unactivated.png', 'romeo image').mousePressed(romeoPressed)
    julietImg = createImg('assets/juliet-unactivated.png', 'juliet image').mousePressed(julietPressed)
    submitImg = createImg('assets/letsgo-btn.png', 'submitbutton').mousePressed(submitPressed).hide()
}

function draw() {
    createCanvas(windowWidth, windowHeight)
    drawromeoandjuliet()
    drawSelectRole()
    drawSubmitButton()
}



function drawromeoandjuliet() {
    mainButtonSize = windowWidth*.2
    mainButtonY = windowHeight*.2

    romeoButtonX = windowWidth*.4-mainButtonSize/2,
    julietButtonX = windowWidth*.62-mainButtonSize/2,
    
    romeoImg.position(romeoButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
    julietImg.position(julietButtonX, mainButtonY).size(mainButtonSize, mainButtonSize*1.80)
}

function drawSelectRole() {
    selectRoleImgWidth = (julietButtonX + mainButtonSize*.8) - romeoButtonX
    selectRoleImg.position(romeoButtonX + windowWidth*.04, windowHeight*.03).size(selectRoleImgWidth, selectRoleImgWidth*0.165)
}

function drawSubmitButton() {
    submitButtonX = windowWidth*.48-mainButtonSize/2,
    submitButtonY = mainButtonY + mainButtonSize*1.80 + windowHeight*0.02
    submitImg.position(submitButtonX, submitButtonY).size(mainButtonSize*1.2, mainButtonSize*0.325)
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
    
    localStorage.setItem("submitName", personChosen)
    localStorage.setItem("submitRoom", room.chatroom)
    window.document.location = 'chat.html' + '?username=' + personChosen + '&chatroom=' + room.chatroom

}