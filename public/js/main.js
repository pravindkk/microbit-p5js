
var value = "nil";
var startCount = false
var count = 0

// Get username and room from URL
const receivedChat = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});



const socket = io();

var chatForm = {
    name: receivedChat.username,
    chatroom: receivedChat.chatroom
}



// Join chatroom
socket.emit("joinRoom", chatForm);


socket.on("isPartnerHome", (msg) => {
    buggy.receivedPartnerStatus(msg);
});

socket.on("receivedLove", (msg) => {
    buggy.displayLove(msg);
});

socket.on("receivedMissYou", (msg) => {
    buggy.displayMissYou(msg);
});




var buggy = {

    atHome: true,
    partnerAtHome: false,
    isHappy: true,
    genderIfBoy: true,

    checkBuggyStatus: function() {
        if (pulse > 10) {
            if (this.atHome == false) {
                //buggy status was changed
                //send buggy status
            }

            this.atHome = true;
        } else {
            if (this.atHome == true) {
                //buggy status was changed
                //send buggy status
            }

            this.atHome = false;
        }
    },

    receivedPartnerStatus: function(msg) {


        if (msg == true) {
            console.log("partner is at home");
            this.partnerAtHome = true;



        } else if (msg == false) {
            console.log("partner is not at home");
            this.partnerAtHome = false;
        }

    },

    sendBuggyStatus: function() {
        socket.emit("checkPartnerHome", this.atHome);
    },

    displayStatus: function() {
        if (this.atHome == true && this.partnerAtHome == true) {
            //display full heart icon
        } else if (this.atHome == true) {
            //display left heart icon
        } else if (this.partnerAtHome == true) {
            //display left heart icon
        }
    },

    sendLove: function() {

        console.log("sending love to server");


        particleSystem.addParticle(true);
        socket.emit("sentLove", true);

    },

    displayLove: function(msg) {
        // if (this.atHome == true && msg == true) {
            //display love icon
            if (msg == true) {

                if (timer.isRunning) {

                    print("timer still running!!")
                   
                } else {
                    //timer is less than 0
                    //reactivate timer and send message
                    timer.reset()
                    writeData("love");
                    console.log("sending love to microbit");
    
                }

            console.log("Received Love");
            partnerParticleSystem.addParticle(true);

            }
        // }
    },

    sendMissYou: function() {
        // if (this.atHome == true) {

            console.log("sending miss to server");

            particleSystem.addParticle(false);
            socket.emit("sentMissYou", true);

        // }
    },

    displayMissYou: function(msg) {
        // if (this.atHome == true && msg == true) {
            //display miss you icon
            if (msg == true) {

                if (timer.isRunning) {

                    print("timer still running!!")
                   
                } else {
                    //timer is less than 0
                    //reactivate timer and send message
                    timer.reset()
                    writeData("miss");
                    console.log("sending miss to microbit");
    
    
                }

            partnerParticleSystem.addParticle(false);
            console.log("Received Miss You");
    }
        // }
    },


};


let backgroundIMG
let cloud1, cloud2
let cloud1PositionX, cloud2PositionX
let loveYouImg, missYouImg
let bothImg, nobodyImg, boyImg, girlImg
let particleSystem, partnerParticleSystem
let connectBtn, disconnectBtn
let bg, darkTitleImg, lightTitleImg

let lampImg, lightImg
let refreshImg, disconnectImg

const ASPECT_RATIO = 900/1400

let sinY = 0


function preload() {
    console.log(windowWidth)


    bothImg = loadImage('assets/boy-girl.png')
    nobodyImg = loadImage('assets/none-home.png')
    boyImg = loadImage('assets/boy-only.png')
    girlImg = loadImage('assets/girl-only.png')

    darkTitleImg = loadImage('assets/title-black.png')
    lightTitleImg = loadImage('assets/title-white.png')

    lampImg = loadImage('assets/lamp.png')
    lightImg = loadImage('assets/light.png')

    cloud1PositionX = windowWidth - windowWidth / 5
    cloud2PositionX = windowWidth / 12
}

function setup() {

    loveYouImg = createImg('assets/love-you-btn.png', 'loveYouImge').mousePressed(toSendLove)
    missYouImg = createImg('assets/miss-you-btn.png', 'missYouImage').mousePressed(toSendMissYou)
   
    refreshImg = createImg('assets/refresh.png', 'refreshImage').mousePressed(connectBle)
    disconnectImg = createImg('assets/disconnect.png', 'disconnectImage').mousePressed(disconnectBle)
   
   
   
    particleSystem = new ParticleSystem(createVector(windowWidth / 2, windowHeight-100));
    partnerParticleSystem = new PartnerParticleSystem(createVector(windowWidth / 2, windowHeight-100), createVector(windowWidth / 2, windowHeight-100),);

    connectBtn = createButton("connect");
    connectBtn.mousePressed(connectBle);
    
    disconnectBtn = createButton("disconnect");
    disconnectBtn.mousePressed(disconnectBle);

    imABoy = createButton("im a boy");
    imABoy.mousePressed(function(){
        buggy.genderIfBoy = true
    });

    imAGirl = createButton("im a girl");
    imAGirl.mousePressed(function(){
        buggy.genderIfBoy = false
    });
    
    if (chatForm.name == "romeo") {
        buggy.genderIfBoy = true
    } else {
        buggy.genderIfBoy = false
    }

    




}

function toSendLove() {
    loveYouImg.position(windowWidth / 4, (windowHeight / 5) + 2)
    loveYouImg.mouseReleased(releasedToSendLove)
    buggy.sendLove()
    
}

function releasedToSendLove() {
    loveYouImg.position(windowWidth / 4, windowHeight / 5)
}

function toSendMissYou() {
    missYouImg.position(windowWidth / 2 + windowWidth / 20, (windowHeight / 5) + 2)
    missYouImg.mouseReleased(releasedToSendMissYou)

    buggy.sendMissYou()
}

function releasedToSendMissYou() {
    missYouImg.position(windowWidth / 2 + windowWidth / 20, windowHeight / 5)
}

function draw() {

    createCanvas(windowWidth, windowHeight)
    
    drawBackground()
    drawButtons()
    drawStatus()
    updateParticleSystem()

    timer.run()

    particleSystem.run();
    partnerParticleSystem.run();


    



}

function drawBackground() {


    //image(bg, 0, 0, windowWidth, windowWidth*0.625)



    if (!buggy.atHome && !buggy.partnerAtHome) {

        background(97)
        image(lightTitleImg, 0, 0, windowWidth, windowWidth*ASPECT_RATIO)
    

    } else {
        background(255)
        image(darkTitleImg, 0, 0, windowWidth, windowWidth*ASPECT_RATIO)

    }





}

function drawButtons() {


    mainButtonSize = windowWidth*.2
    mainButtonY = windowHeight*.2
    
    loveYouImg.position(windowWidth*.2-mainButtonSize/2, mainButtonY).size(mainButtonSize, mainButtonSize)
    missYouImg.position(windowWidth*.8-mainButtonSize/2, mainButtonY).size(mainButtonSize, mainButtonSize)

    cornerButtonWidth = windowWidth*0.13
    cornerButtonHeight = cornerButtonWidth/2000*378
    cornerButtonY = windowWidth*0.05

    refreshImg.position(cornerButtonY, windowHeight*.85).size(cornerButtonWidth, cornerButtonHeight)
    disconnectImg.position(cornerButtonY,windowHeight*.9).size(cornerButtonWidth, cornerButtonHeight)

    //    missYouImg.size(imageSize, imageSize)
    //.position(windowWidth*.69, windowHeight*0.16)
}

function drawStatus() { 

    sinY = sinY + 0.5 * sin(frameCount / 20);


    lightOpacity = 0
    selectedImg = nobodyImg

    if (buggy.atHome && buggy.partnerAtHome) { 

        lightOpacity = 255
        selectedImg = bothImg

    } else if (buggy.atHome && buggy.partnerAtHome) {

        lightOpacity = 0
        selectedImg = nobodyImg


    } else if (buggy.atHome) {

        lightOpacity = 100

        if (buggy.genderIfBoy) {

            selectedImg = boyImg

        } else {

            selectedImg = girlImg

        }

    } else if (buggy.partnerAtHome) {

        lightOpacity = 100

        if (buggy.genderIfBoy) {

            selectedImg = girlImg


        } else {

            selectedImg = boyImg
        }

    }

    image(selectedImg, 0, sinY, windowWidth, windowWidth*ASPECT_RATIO);


    push()
    //draw light with opacity 0-255
    tint(255, lightOpacity)
    image(lightImg, 0, sinY, windowWidth, windowWidth*ASPECT_RATIO)
    pop()

    image(lampImg, 0, sinY, windowWidth, windowWidth*ASPECT_RATIO)







    //draw lamp

}

function updateParticleSystem() {

    if (buggy.genderIfBoy == true) {
        particleSystem.origin = createVector(windowWidth*.4, windowHeight*.8)
        partnerParticleSystem.origin = createVector(0, 0)
        partnerParticleSystem.target = createVector(windowWidth*.4, windowHeight)
    } else {
        particleSystem.origin = createVector(windowWidth*.6, windowHeight*.8)
        partnerParticleSystem.origin = createVector(windowWidth, 0)
        partnerParticleSystem.target = createVector(windowWidth*.6, windowHeight)
    }

}

function handleData(status){
  
    //print(status);

    if (status == 1) {

        if (buggy.atHome == false) {

            buggy.atHome = true
            buggy.sendBuggyStatus()
        }

        

    } else {

        if (buggy.atHome == true) {

            buggy.atHome = false
            buggy.sendBuggyStatus()
        }


    }
    
  }

  let timer = {
      value: 300,
      isRunning: true,

      run: function() {
          this.value -= 1

          if (this.value < 0) {
            this.isRunning = false
          } else {
            this.isRunning = true
          }

      },

      reset: function() {
          this.value = 300
      }

      
  }