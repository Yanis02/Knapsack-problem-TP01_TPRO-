import { useState,useEffect } from "react";
import Item from "./components/Item";
import knapsackSolve from "./knapsack";
function App() {
  const item1={
    name: "phone",
    weight: 4,
    value: 5
  };
  const item2={
    name: "laptop",
    weight: 2,
    value: 3
  };
  const item3={
    name: "printer",
    weight: 3,
    value: 4
  };
  const item4={
    name: "printer",
    weight: 3,
    value: 2
  };
  const item5={
    name: "printer",
    weight: 1,
    value: 2
  };
  const [items,setItems]=useState([item1,item2,item3]);
  const [maxValue,setMaxValue]=useState(0);
  const [add,setAdd]=useState(false);
  const [result,setResult]=useState([]);
  const [maxGain,setMaxGain]=useState(0);
  const [item, setItem] = useState({
    name: "",
    weight : "" , 
    value: "",
  });
  function compare(a, b) {
    if (a.weight < b.weight) {
      return -1;
    }
    if (a.weight > b.weight) {
      return 1;
    }
    return 0;
  }
  items.sort(compare);
  function handleChange(event) {
    const { name, value } = event.target;

    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: name == 'name' ? value : Number(value)
      };
    });
  }
  function submitItem(event) {
    create(item);
    setItem({
      name: "",
      weight : "" , 
      value: "",
    });
    event.preventDefault();
    setAdd(false);
  }
  function create(newItem) {
    setItems(prevItems => {
      var temp = [...prevItems, newItem];
      temp.sort(compare);
      return temp;
    });
  }
  function deleteItem(id){
    setItems(prevItems => {
      return prevItems.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  function solve(){
  const {chosen,valueOptim}=knapsackSolve(items,maxValue);
  setResult(chosen);
  setMaxGain(valueOptim);
  }
 
  return (
    <div className="w-screen flex flex-col gap-y-[50px] justify-center items-center p-5">
      <header className="w-[80%] h-[70px] bg-[#948ED1] text-center text-white rounded-[25px] text-[40px] ">
        Knapsack-problem
      </header>
      <div className="flex flex-col items-center justify-center">
      <label for="max" className="text-[25px]">Maximal value</label>
      <div className="flex justify-between items-center px-2 rounded-[10px] w-[450px] h-fit text-[#948ED1] border-[2px] border-[#948ED1]">
        <input onChange={(e)=>setMaxValue(Number(e.target.value))} name="max" className="w-[380px] h-[40px]  outline-none rounded-[10px]" type="text"></input>
        <p>Kg</p>
      </div>
      </div>
      <section className="w-[80%] h-fit p-5 bg-[#948ED1] rounded-[25px] flex justify-around gap-[20px] items-center flex-wrap">
        {items.map((item,index)=>{
          return(<Item  id={index} delete={deleteItem} selected={result[index]==1 ? true : 0} name={item.name} weight={item.weight} value={item.value}></Item>)
        })}
      </section>
      <button onClick={()=>setAdd(true)} className="w-[250px] h-[50px] text-center text-white bg-[#948ED1] rounded-[10px]">Add item</button>
      <button onClick={solve} className="w-[250px] h-[50px] text-center text-white bg-[#948ED1] rounded-[10px]">Solve</button>

      {add && (<dialog className="w-[30%] h-[500px] p-5 bg-white flex flex-col items-center justify-center gap-y-[20px] border-[2px] border-[#948ED1] rounded-[20px] z-[100] ">
        <p>Add item</p>
             <input name="name"  onChange={handleChange} placeholder="Name" className="outline-none rounded-[10px] border-[2px] border-[#948ED1] p-2"></input>
             <input name="weight" onChange={handleChange} type="number" placeholder="Weight" className="outline-none rounded-[10px] border-[2px] border-[#948ED1] p-2"></input>
             <input name="value" onChange={handleChange} type="number" placeholder="Value" className="outline-none rounded-[10px] border-[2px] border-[#948ED1] p-2"></input>
         <button onClick={submitItem} className="w-[250px] h-[50px] text-center text-white bg-[#948ED1] rounded-[10px]">Add</button>
         <button type="button" onClick={()=>setAdd(false)} className="w-[250px] h-[50px] text-center text-white bg-[#948ED1] rounded-[10px]">Close</button>

      </dialog>)}
      {maxGain!=0 ? (<p className="text-[20px] text-[#948ED1]">The maximal profit is: {maxGain}</p>) : null}
    </div>
  );
}

export default App;
