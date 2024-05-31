import { stratify, tree } from 'd3-hierarchy';
import React, {
  useCallback,
  useMemo,
  useState,
  useRef
} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MiniMap,
  Controls,
} from 'reactflow';

import { initialNodes, initialEdges } from './components/node-edges';
import 'reactflow/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode';
import { useEffect } from 'react';
import { useCurrentNode } from './contexts/useCurrent';
const NODES_TO_INCLUDE = []
const g = tree();

const getLayoutedElements = (nodes, edges, options) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    .getBoundingClientRect();
  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 1.3, height * 1.6])(root);
  return {
    nodes: layout
      .descendants()
      .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};



const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const buttonRef = useRef(null);
  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);
  const snapGrid = [20, 20];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [ CURRENT_OVER_NODE, SET_CURRENT_OVER_NODE ] = useState('')
  const reactFlowInstance = useReactFlow();
  setTimeout(() => {
    reactFlowInstance.fitView({
      duration: 1000,
    });
  }, 10)
  const currentZoom = reactFlowInstance.getZoom();
// console.log(reactFlowInstance)
  const nodeTypes = useMemo(() => ({
    custom: TextUpdaterNode,
  }), []);
  const defaultEdgeOptions = {
    style: {
      stroke: 'black',
      strokeWidth: 4,
    },
  };
  function getAllChildNodeIds(nodeId) {
    const childNodeIds = [];
    const node = initialNodes.find((node) => node.id === nodeId);
    if (node) {
      childNodeIds.push(nodeId);
      initialEdges.forEach((edge) => {
        if (edge.source === nodeId) {
          const childNodeId = edge.target;
          childNodeIds.push(...getAllChildNodeIds(childNodeId));
        }
      });
    }
    return childNodeIds;
  }

  const onInit = (reactFlowInstance) => reactFlowInstance.fitView();
  const handleNodeClick = (event, NODE) => {
   

   
    function getAllChildNodeIds(nodeId) {
      const childNodeIds = [];
      const node = initialNodes.find((node) => node.id === nodeId);
      if (node) {
        childNodeIds.push(nodeId);
        initialEdges.forEach((edge) => {
          if (edge.source === nodeId) {
            const childNodeId = edge.target;
            childNodeIds.push(...getAllChildNodeIds(childNodeId));
          }
        });
      }
      return childNodeIds;
    }
   
    // console.log(NODE)
    const zoom = reactFlowInstance.getZoom();
    let childNodes = getAllChildNodeIds(NODE.id)
    if (zoom >= 0.1) {
        setNodes((nds) =>
          nds.map((node) => {
            if (!childNodes.includes(node.id)) {
              node.hidden = true
            }
            return node;
          })
        );
  }

  };
  const handleNodeDoubleClick = (event, NODE) => {
    initialNodes[0].data.showBackground = true
    let childNodes = getAllChildNodeIds(NODE.id)
    const zoom = reactFlowInstance.getZoom()
    if (zoom)
      setNodes((nds) =>
        nds.map((node) => {
          node.hidden = false
          return node;
        }
        )
      );
      reactFlowInstance.fitView({
        duration: 1000,
      });
  };

  const handleNodeOver = () => {
    // console.log(NODE)
    const zoom = reactFlowInstance.getZoom();
    let childNodes = getAllChildNodeIds(CURRENT_OVER_NODE)
    if(CURRENT_OVER_NODE){
    if (zoom >= 0.1) {
        setNodes((nds) =>
          nds.map((node) => {
            if (!childNodes.includes(node.id)) {
              node.hidden = true
            }
            return node;
          })
        );
  }
}

  };


  // console.log(reactFlowInstance.getZoom())
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, {
        direction,
      });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );
  ;
  useEffect(() => {
    initialNodes[0].data.showBackground = true

    setTimeout(() => {
      // console.log(reactFlowInstance.getZoom())
      onLayout()
      reactFlowInstance.fitView({
        duration: 1000,
      });


      
    })
  }, [])
  return (
    <ReactFlow
      maxZoom={2}
      minZoom={0.001}
      nodes={nodes}
      // onNodeMouseEnter={handleNodeClick}
      // onNodeMouseMove={handleNodeClick}
      onNodeClick={handleNodeClick}
      // onNodeMouseLeave={handleNodeClick}
      onNodeDoubleClick={handleNodeDoubleClick}
      onInit={() => reactFlowInstance.fitView()}
      snapToGrid={true}
      snapGrid={snapGrid}
      edges={edges}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      onEdgesChange={onEdgesChange}
      fitView>
      <MiniMap />
      <Controls />
      <Panel position="top-left">
        <button
          onClick={() => {
            const currentZoom = reactFlowInstance.getZoom();
            const newZoom = currentZoom - 0.01;
            reactFlowInstance.zoomTo(newZoom);
          }}
          className="btn btn-primary me-2 ms-2 "
        >
          Zoom Out
        </button>
        <button
          onClick={() => {
            const currentZoom = reactFlowInstance.getZoom();
            const newZoom = currentZoom + 0.01;
            reactFlowInstance.zoomTo(newZoom);
          }}
          className="btn btn-primary me-2 ms-2 "
        >
          Zoom In
        </button>
        <button
          ref={buttonRef}
          onClick={() => {
            reactFlowInstance.fitView();

          }}
          className='btn btn-primary me-2 ms-2 '> FIT VIEW </button>

      </Panel>
    </ReactFlow>
  );
};

export default function () {
  return (
    <div
      style={{
        width: '100vw',
        height: "100vh",
      }}
    >

      <ReactFlowProvider

      >
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  );
}
