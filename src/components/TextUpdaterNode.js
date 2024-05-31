import { useCallback, useEffect, useState } from 'react';
import { FaBuilding, FaEnvelope } from 'react-icons/fa';
import { MdContactPhone } from 'react-icons/md';
import { Handle, Position, useStore } from 'reactflow';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Draggable from 'react-draggable';
import { initialNodes, initialEdges } from './node-edges';
import { useCurrentNode } from '../contexts/useCurrent';
const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const [isCollapsed, setCollapsible] = useState(false);
  const zoomSelector = (s) => s.transform[2] >= 0.1;
  const showContent = useStore(zoomSelector);
const [topBackGroundColor,setTopBackGroundColor]  = useState(data.showBackground)
  const { SET_CURRENT_OVER_NODE } = useCurrentNode()
  
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);



  const [backgroundColor, setBackgroundColor] = useState('bg-');
  return (
    <Draggable>
      <div
      onClick={()  => setTopBackGroundColor(true)}
      >
        <div
         
          className={`text-updater-node    mb-5 mt-5 `}      >
<div className="main-card p-2  ">

  <div className="card-head  ms-3 me-4  pt-3 pb-3">

<div
 className="patti-1"
style={{
width:"130px",
height:'14px',
  position:"absolute",
  top:48,
  left:24,
  backgroundColor: topBackGroundColor ? "rgb(90, 200, 250)" : "#E2E4E9"
}}
></div>

<div
 className="patch-2"
style={{
width:"10px",
height:'34px',
  position:"absolute",
  top:25,
  left:94,
  backgroundColor: topBackGroundColor ? "rgb(90, 200, 250)" : "#E2E4E9"

  // backgroundColor:'red'
}}
></div>

<div
color={topBackGroundColor ? "white" : 'black'}
className="upper d-flex">
<div style={{
  width: "21%",
  backgroundColor: topBackGroundColor ? "rgb(90, 200, 250)" : "#E2E4E9"
}} className="con1">
</div>
<div
  style={{
    width: "15%",
    height: "100%",
    borderBottom: `25px solid ${topBackGroundColor ? "rgb(90, 200, 250)" : "#E2E4E9"}`,
    borderLeft: '0px ',
    borderRight: '35px solid transparent'
  }}
/>

<div style={{width:"75%",opacity:'0%'}} className="con2  bg-dark "></div>

</div>
<div
style={
{
  backgroundColor: topBackGroundColor ? "rgb(90, 200, 250)" : "#E2E4E9"
}
}
className="lower  d-flex text-light align-items-center justify-content-between pe-2 ps-3 pb-3 pt-3">
<img className=''  style={{height:50,width:50,borderRadius:'50%'}} src="/img_1.jpg" alt="" />
<h4>
  <b>
  Main Organization CEO
  </b>
  </h4>
  <div>
  <FaBuilding color='white' fontSize={27} />
<span>
<b>
  6
</b>

</span>
  </div>


</div>

  </div>
{
showContent &&  
<>
<div className="middle-transparent  ms-3 me-4 pt-2 pb-2 ">



</div>


<div className="card-body ">
<div className="first-row-card-body ms-3 bg-light pe-5 me-4 ps-3 pt-3 pb-3  d-flex  justify-content-center">
<img className=''  style={{height:70,width:70,borderRadius:'50%'}} src="/img_1.jpg" alt="" />
<div className="org-name p-2">
<h4>
  <b>
  Main Organization CEO
  </b>
  </h4>
<h6>John Martin</h6>

</div>

</div>
<div className="second-row-card-body bg-light ms-3 pe-5 me-4 ps-3 pt-3 pb-3  d-flex  justify-content-between">
<FaEnvelope color='rgb(90, 200, 250)' fontSize={37} />
<div className="org-name ">
<h4>
  <b>
  Company@gmail.com
  </b>
  </h4>

</div>

</div>
<div className="third-row-card-body bg-light ms-3 pe-5 me-4 ps-3 pt-3 pb-3  d-flex  justify-content-between">
<MdContactPhone color='rgb(90, 200, 250)' className='' fontSize={37} />
<div className="org-name ">
<h4>
  <b>
+1 823 436 875
  </b>
  </h4>

</div>


</div>
<div className="fourth-row-card-body bg-light ms-3 pe-5 me-4 ps-3 pt-3 pb-3  d-flex  justify-content-between">
<div className="org-name ">
<hr />

</div>


</div>
</div>

</>

}

</div>
                
           
<Handle
  type="source"
  position={Position.Bottom}
  id="b"
  isConnectable={isConnectable}
  style={{
opacity:'0%'
   
//  display:'hidden'
   
  }}
/>

<Handle
  type="target"
  position={Position.Top}
  isConnectable={isConnectable}
  style={{
opacity:'0%'
}}
/>
        </div>
      </div>

    </Draggable>
  );
}

export default React.memo(TextUpdaterNode);
