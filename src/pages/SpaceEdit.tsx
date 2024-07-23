import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import GestureIcon from '@mui/icons-material/Gesture';
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

// Icon SVG로 바꿔야함

const styles = {
    largeIcon: {
      width: 60,
      height: 60,
    },
};

interface Coordinate {
    x: number;
    y: number;
};

  
const SpaceEdit = () => {

    const canvasDivRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [tableSize, setTableSize] = useState({
        "x" : 12,
        "y" : 8,
    });
    const cellSize:number = 64;

    const [title, setTitle] = useState("Title");

    const [tableStatus, setTableStatus] = useState<boolean [][]>([]);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

    const [spacebarStatus, setSpacebarStatus] = useState<boolean>(false);
    const [mouseStatus, setMouseStatus] = useState<boolean>(false);

    const [originCanvasPosition, setOriginCanvasPosition] = useState<Coordinate>({x: 0, y: 0});
    const [startCanvasPosition, setStartCanvasPosition] = useState<Coordinate>({x: 0, y: 0});
    const [endCanvasPosition, setEndCanvasPosition] = useState<Coordinate>({x: 0, y: 0});

    const [drawType, setDrawType] = useState<string>("test");

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
        if(canvas == null) return;
        
        const canvasDiv = canvasDivRef.current
        if(canvasDiv == null) {
            return;
        }
        const { width, height } = canvasDiv.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
        setOriginCanvasPosition({x: width/2, y:height/2});

        const context = canvas.getContext("2d");
        if(context == null) {
            return;
        }
        context.strokeStyle = "black";
        context.lineWidth = 2.5;

        setCtx(context);

        const handleKeyDown = (e:KeyboardEvent) => {
            if (e.key === ' ') {
                setSpacebarStatus(true);
            } 
            else if (e.key === 'ArrowLeft') {
                console.log('ArrowLeft');
            }
            else if (e.key === 'ArrowRight') {
                console.log('ArrowRight');
            }
        };

        const handleKeyUp = (e:KeyboardEvent) => {
            if (e.key === ' ') {
                setSpacebarStatus(false);
            } 
            // else if (e.key === 'ArrowLeft') {
            //     console.log('ArrowLeft');
            // }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(()=> {
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        context.strokeStyle = "black";
        context.lineWidth = 2.5;
        
        context.clearRect(0, 0, canvas.width, canvas.height);

        const canvasPosition = {
            x: originCanvasPosition.x + (endCanvasPosition.x - startCanvasPosition.x),
            y: originCanvasPosition.y + (endCanvasPosition.y - startCanvasPosition.y)
        };

        context.beginPath();
        context.moveTo(startCanvasPosition.x, startCanvasPosition.y);
        context.lineTo(endCanvasPosition.x, endCanvasPosition.y);
        context.stroke();

        if(tableStatus.length == 0) return;
        for(let i = 0; i < tableSize.y; i++) {
            for(let j = 0; j < tableSize.x; j++) {
                const gridX = canvasPosition.x + j*cellSize - (tableSize.x * cellSize)/2;
                const gridY = canvasPosition.y + i*cellSize - (tableSize.y * cellSize)/2;

                if(tableStatus[i][j]) {
                    context.fillRect(gridX, gridY, cellSize, cellSize);
                } else {
                    context.strokeStyle = "lightgray";
                    context.strokeRect(gridX, gridY, cellSize, cellSize);
                }
            }
        }
    }, [tableStatus, originCanvasPosition, endCanvasPosition])

    const [firstStatus, setFirstStatus] = useState<boolean>(false);
    
    const canvasMouseDownEvent = (e:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        
        setMouseStatus(true);
        if(drawType == 'test') {
            const x = (offsetX - originCanvasPosition.x + (tableSize.x * cellSize)/2)/cellSize;
            const y = (offsetY - originCanvasPosition.y + (tableSize.y * cellSize)/2)/cellSize;
            if(x < 0 || x >= tableSize.x || y < 0 || y >= tableSize.y) return;
            console.log(x, y);
            setFirstStatus(!tableStatus[Math.trunc(y)][Math.trunc(x)]);
        }
        if(spacebarStatus) {
            setStartCanvasPosition({x: offsetX, y: offsetY});
        }
    };

    const canvasMouseUpEvent = (e:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setMouseStatus(false);
        setOriginCanvasPosition({
            x: originCanvasPosition.x + (endCanvasPosition.x - startCanvasPosition.x),
            y: originCanvasPosition.y + (endCanvasPosition.y - startCanvasPosition.y)
        });
        setStartCanvasPosition({x:0, y:0});
        setEndCanvasPosition({x:0, y:0});
    };

    const canvasMouseMoveEvent = (e:React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if(mouseStatus) {
            // console.log(offsetX, offsetY);
        }
        if(mouseStatus) {
            if(spacebarStatus) {
                setEndCanvasPosition({x: offsetX, y: offsetY});
                console.log(endCanvasPosition.x - startCanvasPosition.x, endCanvasPosition.y - startCanvasPosition.y);
            }
            else if(ctx) {
                const x = (offsetX - originCanvasPosition.x + (tableSize.x * cellSize)/2)/cellSize;
                const y = (offsetY - originCanvasPosition.y + (tableSize.y * cellSize)/2)/cellSize;
                if(x < 0 || x >= tableSize.x || y < 0 || y >= tableSize.y) return;
                console.log(x, y);
                tableStatus[Math.trunc(y)][Math.trunc(x)] = firstStatus;
                setTableStatus([...tableStatus]);
            }
        }
    }

    return (
      <div className='bg-slate-400 w-screen h-screen flex flex-col'>
        <div className='flex text-4xl items-center border-b-2 border-gray-800'>
            <ChevronLeftIcon className='text-4xl'/>
            <div>{title}</div>
        </div>
        <div className='flex border-b-2 border-gray-800'>
            <MenuIcon />
            <PanoramaFishEyeIcon />
            <CropSquareIcon />
            <GestureIcon />
        </div>
        <div className='flex flex-grow'>
            <div ref={canvasDivRef} className='flex-grow border-r-2 border-gray-800 items-center justify-center flex'>
                <canvas className='bg-white'
                    ref={canvasRef}
                onMouseDown={canvasMouseDownEvent}
                onMouseUp={canvasMouseUpEvent}
                onMouseMove={canvasMouseMoveEvent}
                // onMouseLeave={finishDrawing}
                />
            </div>
            <div className='w-64'>

            </div>
        </div>
      </div>
    );
};
  
export default SpaceEdit;