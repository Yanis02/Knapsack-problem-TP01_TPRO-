import React from 'react'

function Item(props) {
  return (
        <div className={props.selected==false ? 'w-[200px] h-fit border-[2px] border-[#7206FC] p-5 flex flex-col items-center gap-y-[10px] text-[20px] text-[#7206FC] rounded-[10px] bg-white' :'w-[200px] p-5 h-fit border-[2px] border-[#7206FC] flex flex-col items-center gap-y-[10px] text-[20px] text-[#7206FC] rounded-[10px] bg-[#917B7B]'}>
        <p>{props.name}</p>
        <div className='w-[90%] h-[2px] bg-black'></div>
        <p>Weight: {props.weight}</p>
        <p>Value: {props.value}</p>
   <button className='w-[80px] h-[30px] rounded-[5px] bg-[#948ED1] text-white text-center text-[18px]' onClick={()=>props.delete(props.id)}>Delete</button>
    </div>
  )
}

export default Item