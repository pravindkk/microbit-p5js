
var value = "nil";
var startCount = false
var count = 0

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});


function outputRoomName(room) {
}

// Add users to DOM
function outputUsers(users) {
}

//Prompt the user before leave chat room
// leaveButton.addEventListener("click", () => {
//     const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
//     if (leaveRoom) {
//         window.location = "../index.html";
//     } else {}
// });

socket.on("isPartnerHome", (msg) => {
    buggy.receivedPartnerStatus(msg);
});

socket.on("receivedLove", (msg) => {
    buggy.displayLove(msg);
});

socket.on("receivedMissYou", (msg) => {
    buggy.displayMissYou(msg);
});

console.log(new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""));



var buggy = {

    atHome: true,
    partnerAtHome: false,
    isHappy: true,
    genderIsBoy:true,

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
        // if (this.atHome == true) {
            //send love
            particleSystem.addParticle(true);
            console.log("sending love");
            socket.emit("sentLove", true);
        // }
    },

    displayLove: function(msg) {
        // if (this.atHome == true && msg == true) {
            //display love icon
            if (msg == true) {
            console.log("Received Love");
            partnerParticleSystem.addParticle(true);

            }
        // }
    },

    sendMissYou: function() {
        // if (this.atHome == true) {
            //send miss you
            particleSystem.addParticle(false);
            console.log("sending miss you");
            socket.emit("sentMissYou", true);
        // }
    },

    displayMissYou: function(msg) {
        // if (this.atHome == true && msg == true) {
            //display miss you icon
            if (msg == true) {
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


function preload() {
    console.log(windowWidth)
    treeImg = loadImage('/assets/treeBg.png');
    cloud1 = loadImage('/assets/cloud1.png')
    cloud2 = loadImage('assets/cloud2.png')

    bothImg = loadImage('assets/boygirl.png')
    nobodyImg = loadImage('assets/none.png')
    boyImg = loadImage('assets/boyonly.png')
    girlImg = loadImage('assets/girlonly.png')




    cloud1PositionX = windowWidth - windowWidth / 5
    cloud2PositionX = windowWidth / 12
}

function setup() {

    loveYouImg = createImg('assets/loveYouImage.png', 'loveYouImge').mousePressed(toSendLove)
    missYouImg = createImg('assets/missYouImage.png', 'missYouImage').mousePressed(toSendMissYou)
    particleSystem = new ParticleSystem(createVector(windowWidth / 2, windowHeight-100));
    partnerParticleSystem = new PartnerParticleSystem(createVector(windowWidth / 2, windowHeight-100), createVector(windowWidth / 2, windowHeight-100),);

    connectBtn = createButton("connect");
    connectBtn.mousePressed(connectBle);
    
    disconnectBtn = createButton("disconnect");
    disconnectBtn.mousePressed(disconnectBle);

    imABoy = createButton("im a boy");
    imABoy.mousePressed(function(){
        buggy.genderIsBoy = true
    });

    imAGirl = createButton("im a girl");
    imAGirl.mousePressed(function(){
        buggy.genderIsBoy = false
    });




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
    
    background(255, 244, 229)

    drawTrees()
    drawClouds()
    drawButtons()
    drawStatus()
    updateParticleSystem()

    particleSystem.run();
    partnerParticleSystem.run();


    



}

function drawClouds() { 

    cloudWidth = windowWidth*0.1
    cloudHeight = cloudWidth*0.4593


    image(cloud1, cloud1PositionX, windowHeight / 2.80, cloudWidth, cloudHeight)

    cloud1PositionX--

    image(cloud2, cloud2PositionX, windowHeight / 18, cloudWidth, cloudHeight)

    cloud2PositionX--

    if (cloud1PositionX < -200) {
        cloud1PositionX = windowWidth
    }

    if (cloud2PositionX < -200) {
        cloud2PositionX = windowWidth
    }
}

function drawTrees() {

    treeWidth = windowWidth
    treeHeight = treeWidth * 0.625

    treeImgY = windowHeight - treeHeight

    image(treeImg, 0, treeImgY, windowWidth, windowWidth * 0.625);


}

function drawButtons() {
    
    loveYouImg.size(windowWidth * 0.212, windowWidth * 0.0778)
        .position(windowWidth / 4, windowHeight / 5)

    missYouImg.size(windowWidth * 0.212, windowWidth * 0.0778)
    .position(windowWidth / 2 + windowWidth / 20, windowHeight / 5)
}

function drawStatus() { 


    statusWidth = windowWidth*.3
    statusHeight = statusWidth * 0.8907

    statusX = windowWidth/2 - statusWidth/2
    statusY = (windowHeight - statusHeight) + (5 * sin(frameCount / 20));


    if (buggy.atHome == true && buggy.partnerAtHome == true) { 

        image(bothImg, statusX, statusY, statusWidth, statusHeight);

    } else if (buggy.atHome == false && buggy.partnerAtHome == false) {

        image(nobodyImg, statusX, statusY, statusWidth, statusHeight);

    } else if (buggy.atHome == true) {

        if (buggy.genderIsBoy == true) {

            image(boyImg, statusX, statusY, statusWidth, statusHeight);

        } else {

            image(girlImg, statusX, statusY, statusWidth, statusHeight);
        }

    } else if (buggy.partnerAtHome == true) {

        if (buggy.genderIsBoy == true) {

            image(girlImg, statusX, statusY, statusWidth, statusHeight);

        } else {

            image(boyImg, statusX, statusY, statusWidth, statusHeight);
        }

    }

}

function updateParticleSystem() {

    if (buggy.genderIsBoy == true) {
        particleSystem.origin = createVector(windowWidth*.4, windowHeight*.8)
        partnerParticleSystem.origin = createVector(0, 0)
        partnerParticleSystem.target = createVector(windowWidth*.4, windowHeight*.8)
    } else {
        particleSystem.origin = createVector(windowWidth*.6, windowHeight*.8)
        partnerParticleSystem.origin = createVector(windowWidth, 0)
        partnerParticleSystem.target = createVector(windowWidth*.6, windowHeight*.8)
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