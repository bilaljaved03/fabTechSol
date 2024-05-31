import React,{useState,useRef} from 'react'
import Draggable from 'react-draggable';
function Card({x1,y1,setX1,setY1}) {
   const div1Ref = useRef(null)
  return (
  <Draggable onDrag={()=>{
    const div1Rect = div1Ref.current.getBoundingClientRect();    
    const position = {
        topCenter: {
          x: div1Ref.current.offsetLeft + div1Ref.current.offsetWidth / 2,
          y: div1Ref.current.offsetTop
        },
        leftCenter: {
          x: div1Ref.current.offsetLeft,
          y: div1Ref.current.offsetTop + div1Ref.current.offsetHeight / 2
        },
        rightCenter: {
          x: div1Ref.current.offsetLeft + div1Ref.current.offsetWidth,
          y: div1Ref.current.offsetTop + div1Ref.current.offsetHeight / 2
        },
        bottomCenter: {
          x: div1Ref.current.offsetLeft + div1Ref.current.offsetWidth / 2,
          y: div1Ref.current.offsetTop + div1Ref.current.offsetHeight
        }
      };
    setX1(position.topCenter.x)
    setY1(position.topCenter.y)
    console.log(position)
    }}>
    <div
ref={div1Ref}      
    style={{
        height:600,
        width:400 ,
    }}
    className=" p-3  m-5 shadow border card">
      <img src="/img_2.jpg" width={"100%"} height={300}  alt="Operating System" />
      <div className="card-description mt-2">
        <h2><b>Operating System...</b> </h2>
        <h3>Author: Abraham Silberschatz</h3>
        <h3>Year :1995</h3>
        <h3>Edition :3rd</h3>
        <div className="container d-flex align-items-end justify-content-end me-4">
          <button className='btn btn-primary btn-lg' >Details</button>
        </div>
      </div>
    </div>
  </Draggable>
  )
}
export default Card
