import React, { useState, useEffect, useRef } from 'react';



export default function Address(props) {

  const [address, setAddress] = useState()

  useEffect(() => {

    if(props.address){
      const ad = props.address.substring(0,6) + "..." + props.address.substring(props.address.length - 4);
      setAddress(ad)
    }else{
      setAddress(null)
    }

  },[props.address])


  return (
    <div>{address?address:''}</div>
  );
}
