(function (dots) {
  'use strict';
  
  dots.Point = Point;
  
  Point.distance = distance;
  
  ////////////
  
  function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  
  function distance(A, B) {
    return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
  }
  
}(window.dots));