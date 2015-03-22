(function (dots) {
  'use strict'
  
  dots.Particle = Particle;
  
  Particle.distance = distance;
  Particle.collide = collide;
  
  ////////////
  
  function Particle(o, v, a, m, r) {
    // Position of the particule 
    this.o = o
    
    // Velocity
    this.v = v;
    
    // Acceleration
    this.a = a;
    
    // Mass
    this.m = m;
    
    // Radius
    this.r = r;
    
    // Forces on the particle
    this.forces = [v];
    
    // Functions
    this.gravitationalForce = gravitationalForce;
    this.compute = compute;
    this.move = move;
    this.collide = collide;
    this.draw = draw;
    this.drawVelocity = this.drawVelocity;
    this.drawAcceleration = this.drawAcceleration;
    
    ////////////
    
    function gravitationalForce(universe) {
      var
      forces = [],
      particle,
      partialForceNorm, i, l;
      
      for (i = 0, l = universe.length; i < l; i += 1) {
        particle = universe[i];
        
        if (particle !== this) {
          partialForceNorm = dots.constants.G * this.m * particle.m / Math.pow(Particle.distance(this, particle), 2);
          forces.push((new dots.Vector2D(this.o, particle.o.x - this.o.x, particle.o.y - this.o.y)).normalise().scale(partialForceNorm));
        }
      }
      
      return forces;
    }
    
    function compute(universe) {
      this.forces = [this.v.scale(this.m)].concat(this.gravitationalForce(universe));
    }
    
    function move() {
      var i, l, sumForce = new dots.Vector2D(this.o, 0, 0);
      
      for (i = 0, l = this.forces.length; i < l; i += 1) {
        sumForce = dots.Vector2D.add(sumForce, this.forces[i]);
      }
      
      this.v = sumForce.scale(1 / this.m);
      
      this.o.x += this.v.x;
      this.o.y += this.v.y;
    }
    
    function collide(universe) {
      
    }
    
    function draw(context, scale) {
      var radius;
      
      scale = scale || 1;
      
      radius = scale * this.r;
      
      context.moveTo(this.o.x + radius, this.o.y);
      context.arc(this.o.x, this.o.y, radius, 0, 2 * Math.PI);
    }
    
    function drawVelocity(context, scale) {
      this.v.draw(context, scale);
    }
    
    function drawAcceleration(context, scale) {
      this.a.draw(context, scale);
    }
  }
  
  function distance(A, B) {
    return dots.Point.distance(A.o, B.o);
  }
  
  function collide(universe, boundaries) {
    var i, j, l, A, B;
    
    for (i = 0, l = universe.length; i < l; i += 1) {
      A = universe[i];
      
      if (A.o.y + A.v.y + A.r > boundaries.height || A.o.y + A.v.y - A.r < 0) {
        A.v.y = -A.v.y;
      }
      if (A.o.x + A.v.x + A.r > boundaries.width || A.o.x + A.v.x - A.r < 0) {
        A.v.x = -A.v.x;
      }
      
      for (j = i + 1; j < l; j += 1) {
        B = universe[j];
                
        distance = Particle.distance(A, B);
      
        if (distance <= A.r + B.r) {
          collideTwo(A, B);
        }
      }
    }
  }
  
  function collideTwo(A, B) {
    var
    σ   = Particle.distance(A, B),
    Δx  = B.o.x - A.o.x,
    Δy  = B.o.y - A.o.y,
    Δvx = B.v.x - A.v.x,
    Δvy = B.v.y - A.v.y,
    σ   = Math.sqrt(Math.pow(Δx, 2) + Math.pow(Δy, 2)),
    J   = 2 * A.m * B.m * (Δvx * Δx + Δvy * Δy) / (σ * (A.m + B.m)),
    Jx  = (J * Δx) / σ,
    Jy  = (J * Δy) / σ;
    
    A.v.x += Jx / A.m;
    A.v.y += Jy / A.m;
    B.v.x -= Jx / B.m;
    B.v.y -= Jy / B.m;
  }
  
}(window.dots));