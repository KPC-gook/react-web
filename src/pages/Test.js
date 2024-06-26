import React, { useRef, useState, useEffect } from "react";
import './test.css';

const Test = () => {
  const canvasRef = useRef(null);

  const [canvasTag, setCanvasTag] = useState([]);

  const [tableSize, setTableSize] = useState({
    "x" : 12,
    "y" : 8,
  });
  const cellSize = 64;

  const [tableStatus, setTableStatus] = useState(null);

  const contextRef = useRef(null);
  const [ctx, setCtx] = useState();

  useEffect(()=>{

    let arr = [];
    for(let i = 0; i < tableSize.y; i++) {
      let a = [];
      for(let j = 0; j < tableSize.x; j++) {
        a[j] = false;
      }
      arr[i] = a;
    }
    setTableStatus([...arr]);

    const canvas = canvasRef.current;
    canvas.width = tableSize.x * cellSize
    canvas.height = tableSize.y * cellSize;
    
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;

    for(let i = 0; i < tableSize.y; i++) {
      for(let j = 0; j < tableSize.x; j++) {
        context.strokeRect(j*cellSize, i*cellSize, cellSize, cellSize);
      }
    }
    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  useEffect(()=> {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;

    if(tableStatus == null) return;
    for(let i = 0; i < tableSize.y; i++) {
      for(let j = 0; j < tableSize.x; j++) {
        if(tableStatus[i][j]) {
          context.fillRect(j*cellSize, i*cellSize, cellSize, cellSize);
        } else {
          context.strokeStyle = "lightgray";
          context.clearRect(j*cellSize, i*cellSize, cellSize, cellSize);
          context.strokeRect(j*cellSize, i*cellSize, cellSize, cellSize);
        }
      }
    }

    contextRef.current = context;

    setCtx(contextRef.current);
  }, [tableStatus])

  // console.log("ctx : ", ctx);
  // console.log(tableStatus);

  const [type, setType] = useState("");

  useEffect(()=>{
    console.log(type);
  }, [type]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [firstStatus, setFirstStatus] = useState({
    "status" : false,
    "x" : 0,
    "y" : 0,
  });

  console.log(firstStatus);
  console.log(tableStatus);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    setFirstStatus({
      "status" : !tableStatus[(offsetY/cellSize).toFixed()][(offsetX/cellSize).toFixed()],
    })
  }

  const finishDrawing = () => {
    setIsDrawing(false);
  }

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if(ctx) {
      if(isDrawing) {
        tableStatus[Math.trunc(offsetY/cellSize)][Math.trunc(offsetX/cellSize)] = firstStatus.status;
        setTableStatus([...tableStatus]);
      }
    }
  }

  return (
    <div className="main_div">
      <div>
        <div className="flex">
          <div onClick={() => setType("circle")}>ㅇ</div>
          <div onClick={() => setType("square")}>ㅁ</div>
          <div onClick={() => setType("line")}>ㅣ</div>
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
          ></canvas>
      </div>
    </div>
  );
};

export default Test;