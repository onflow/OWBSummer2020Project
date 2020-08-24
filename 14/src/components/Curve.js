// This is copy from https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90
import React, { useRef, useEffect, useContext } from 'react';
import GlobalContext from '../Global'


const Curve = (props) => {
  let ref = useRef();
  const context = useContext(GlobalContext);
  useEffect(() => {
    let canvas = ref.current;

    const textSize = 16

    const width = canvas.width ;
    const height = canvas.height ;

    if (canvas.getContext && props.flowReserve && props.baloonReserve) {

      const k = props.flowReserve * props.baloonReserve

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,width,height);

      let maxX = k/(props.flowReserve/4)
      let minX = 0

      if(props.addingFlow||props.addingBaloon){
        maxX = k/(props.flowReserve*0.4)
        //maxX = k/(props.flowReserve*0.8)
        minX = k/Math.max(0,(500-props.flowReserve))
      }

      const maxY = maxX * height / width;
      const minY = minX * height / width;

      const plotX = (x)=>{
        return (x - minX) / (maxX - minX) * width ;
      }

      const plotY = (y)=>{
        return height - (y - minY) / (maxY - minY) * height ;
      }
      ctx.strokeStyle = "#000000";
      ctx.fillStyle = "#000000";
      ctx.font = textSize+"px Arial";
      // +Y axis
      ctx.beginPath() ;
      ctx.moveTo(plotX(minX),plotY(0)) ;
      ctx.lineTo(plotX(minX),plotY(maxY)) ;
      ctx.stroke() ;
      // +X axis
      ctx.beginPath() ;
      ctx.moveTo(plotX(0),plotY(minY)) ;
      ctx.lineTo(plotX(maxX),plotY(minY)) ;
      ctx.stroke() ;

      ctx.lineWidth = 2 ;
      ctx.beginPath() ;
      let first = true
      for (var x = minX; x <= maxX; x += maxX/width) {
        /////
        var y = k / x
        /////
        if (first) {
          ctx.moveTo(plotX(x),plotY(y))
          first = false
        } else {
          ctx.lineTo(plotX(x),plotY(y))
        }
      }
      ctx.stroke() ;

      ctx.lineWidth = 1 ;

      if(props.addingFlow){

        let newEthReserve = props.flowReserve + parseFloat(props.addingFlow)

        ctx.fillStyle = "#bbbbbb";
        ctx.beginPath();
        ctx.arc(plotX(newEthReserve),plotY(k/(newEthReserve)), 5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "#009900";
        drawArrow(ctx,plotX(props.flowReserve),plotY(props.baloonReserve),plotX(newEthReserve),plotY(props.baloonReserve))

        ctx.fillStyle = "#000000";
        ctx.fillText(""+props.addingFlow+" Flow input", plotX(props.flowReserve)+textSize, plotY(props.baloonReserve)-textSize);

        ctx.strokeStyle = "#990000";
        drawArrow(ctx,plotX(newEthReserve),plotY(props.baloonReserve),plotX(newEthReserve),plotY(k/(newEthReserve)))

        let amountGained =  Math.round(10000 * ( props.addingFlow * props.baloonReserve ) / ( newEthReserve ) ) /10000
        ctx.fillStyle = "#000000";
        ctx.fillText(""+(amountGained)+" 🏀 output (-0.3% fee)", plotX(newEthReserve)+textSize,plotY(k/(newEthReserve)));
        
        context.setFlowAmountGained(amountGained)
        
      }else if(props.addingBaloon){

        let newTokenReserve = props.baloonReserve + parseFloat(props.addingBaloon)

        ctx.fillStyle = "#bbbbbb";
        ctx.beginPath();
        ctx.arc(plotX(k/(newTokenReserve)),plotY(newTokenReserve), 5, 0, 2 * Math.PI);
        ctx.fill();

        //console.log("newTokenReserve",newTokenReserve)
        ctx.strokeStyle = "#990000";
        drawArrow(ctx,plotX(props.flowReserve),plotY(props.baloonReserve),plotX(props.flowReserve),plotY(newTokenReserve))

        ctx.fillStyle = "#000000";
        ctx.fillText(""+(props.addingBaloon)+" 🏀 input", plotX(props.flowReserve)+textSize,plotY(props.baloonReserve));

        ctx.strokeStyle = "#009900";
        drawArrow(ctx,plotX(props.flowReserve),plotY(newTokenReserve),plotX(k/(newTokenReserve)),plotY(newTokenReserve))

        let amountGained =  Math.round(10000 * ( props.addingBaloon * props.flowReserve ) / ( newTokenReserve ) ) /10000
        //console.log("amountGained",amountGained)
        ctx.fillStyle = "#000000";
        ctx.fillText(""+amountGained+" Flow output (-0.25% fee)", plotX(k/(newTokenReserve))+textSize,plotY(newTokenReserve)-textSize);
        context.setBaloonAmountGained(amountGained)
      }

      ctx.fillStyle = "#0000FF"
      ctx.beginPath();
      ctx.arc(plotX(props.flowReserve),plotY(props.baloonReserve), 5, 0, 2 * Math.PI);
      ctx.fill();

    }
  },[props]);


  return (
    <div style={{margin:32,position:'relative',width:props.width,height:props.height}}>
      <canvas
        style={{position:'absolute',left:0,top:0}}
        ref={ref}
        {...props}
      />
      <div style={{position:'absolute',left:"20%",bottom:-20}}>
        -- Flow Token Reserve -->
      </div>
      <div style={{position:'absolute',left:-20,bottom:"20%",transform:"rotate(-90deg)",transformOrigin:"0 0"}}>
        -- Baloon Token Reserve -->
      </div>
    </div>
  );
};

export default Curve;


const drawArrow = (ctx,x1,y1,x2,y2)=>{
  let [dx,dy] = [x1-x2, y1-y2]
  let norm = Math.sqrt(dx * dx + dy * dy)
  let [udx, udy] = [dx/norm, dy/norm]
  const size = norm/7
  ctx.beginPath();
  ctx.moveTo(x1,y1) ;
  ctx.lineTo(x2,y2) ;
  ctx.stroke() ;
  ctx.moveTo(x2,y2) ;
  ctx.lineTo(x2 + udx*size - udy*size,y2 + udx*size + udy*size ) ;
  ctx.moveTo(x2,y2) ;
  ctx.lineTo(x2 + udx*size +udy*size ,y2 - udx*size + udy*size) ;
  ctx.stroke() ;
}
