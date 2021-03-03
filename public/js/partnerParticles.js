let PartnerParticle = function(position, action, targetLoc) {
  //this.acceleration = createVector(-0.05, -0.05);
  this.position = position.copy();
  this.lifespan = 255;
  this.action = action
  this.targetLoc = targetLoc.copy()

  let desiredVector = p5.Vector.sub(this.targetLoc,this.position);  // A vector pointing from the location to the target
  let desiredVectorHeading = desiredVector.heading()
  this.velocity = p5.Vector.fromAngle(desiredVectorHeading, 1);
  this.acceleration = p5.Vector.fromAngle(desiredVectorHeading, 0.1);

  //this.velocity = createVector(random(-1, 0), random(-1, 1));

};

PartnerParticle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
PartnerParticle.prototype.update = function(){

  // let desiredVector = p5.Vector.sub(this.targetLoc,this.position);
  // let desiredVectorHeading = desiredVector.heading()
  // this.nextVelocity = p5.Vector.fromAngle(desiredVectorHeading, 1);


  //print(desiredVector.heading())

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);



  this.lifespan -= 1.7;
  //if (this.lifespan > 255) {this.lifespan = 255}


};

// Method to display
PartnerParticle.prototype.display = function() {
  //stroke(200, this.lifespan);
  //strokeWeight(2);


  if (this.action == true) {
    fill(246, 143, 129, this.lifespan);
  

    noStroke()
    size = 24
    x = this.position.x
    y = this.position.y
  
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE)

  } else {

    fill(47, 64, 128, this.lifespan);
    noStroke();

    size = 1
    x = this.position.x
    y = this.position.y

    arc(x, y, 25 * size, 20 * size, PI + TWO_PI, TWO_PI);
    arc(x + 10, y, 25 * size, 45 * size, PI + TWO_PI, TWO_PI);
    arc(x + 25, y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI);
    arc(x + 40, y, 30 * size, 20 * size, PI + TWO_PI, TWO_PI);

  }

};

// Is the particle still useful?
PartnerParticle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let PartnerParticleSystem = function(position, targetLoc) {
  this.origin = position.copy();
  this.particles = [];
  this.targetLoc = targetLoc.copy()
};

PartnerParticleSystem.prototype.addParticle = function(action) {

  spread = windowHeight*.5
  newX = this.origin.x
  newY = Math.floor(Math.random() * spread) + 1 + this.origin.y


  updatedOrigin = createVector(newX, newY)

  this.particles.push(new PartnerParticle(updatedOrigin, action, this.targetLoc));
};

PartnerParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};