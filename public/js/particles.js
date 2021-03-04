let Particle = function(position, action) {
  if (buggy.genderIsBoy) {  this.acceleration = createVector(-0.05, -0.05);
    print('boy')
  } 
  else {  this.acceleration = createVector(0.05, -0.05);
    print('girl')

  }
  this.velocity = createVector(random(-1, 0), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 0;
  this.action = action
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan += 2;
};

// Method to display
Particle.prototype.display = function() {
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
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(action) {

  this.particles.push(new Particle(this.origin, action));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};