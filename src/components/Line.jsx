import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
function Line({x1,y1,x2,y2}) {
  return (
    <div>
 <svg
 style={{
  position:'absolute',
  top:'0',
  left:"0"
 }}
 width="800" height="500">
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="black"
    strokeWidth="2"
  />
</svg>
    </div>
  );
}
export default Line;