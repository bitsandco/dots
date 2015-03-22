(function (dots) {
  'use strict';
  
  dots.Vector2D = Vector2D;
  
  Vector2D.add = add;
  
  ////////////
  
  function Vector2D(o, x, y) {
    // Origin point
    this.o = o;
    
    // Components
    this.x = x;
    this.y = y;
    
    // Functions
    this.draw = draw;
    this.scale = scale;
    this.norm = norm;
    this.normalise = normalise;
    
    ////////////
    
    function draw(context, scale) {
      scale = scale || 1;
      
      context.moveTo(this.o.x, this.o.y);
      context.lineTo(this.o.x + scale * this.x, this.o.y + scale * this.y);
    }
    
    function scale(k) {
      return new Vector2D(this.o, k * this.x, k * this.y);
    }
    
    function norm() {
      return dots.Point.distance(this.o, new dots.Point(this.x + this.o.x, this.y + this.o.y));
    }
    
    function normalise() {
      return this.scale(this.norm());
    }
  }
  
  function add(V, W) {
    return new Vector2D(V.o, V.x + W.x, V.y + W.y);
  }
  
}(window.dots));