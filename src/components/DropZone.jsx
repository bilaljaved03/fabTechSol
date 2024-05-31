import { useDrop } from 'react-dnd';

function DropZone() {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'card',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={dropRef} className="drop-zone">
      {isOver ? 'Drop the card here!' : 'Drag a card here!'}
    </div>
  );
}
export default DropZone;