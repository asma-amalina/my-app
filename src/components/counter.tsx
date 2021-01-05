import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/counter.css';
import Assumptions from './assumptions'

const Counter: React.FC = () =>{

  const[noOfWords, setNoOfWords] = useState(0);
  const[noOfChar, setNoOfChar] = useState(0);
  const[outputList, setOutputList] = useState([]);
  const[outputListFinalObjects, setOutputListFinalObjects] = useState([{value: " ",count: 0}]);
  const[generateTableType, setGenerateTableType] = useState("default");
  const[assumptionsToggle, setAssumptionsToggle] = useState(false);
  const[searchVal, setSearchVal] = useState("");

  const handleChange = (e: any) =>{
    let words = e.target.value.toString();
    if (words.length>0){
      let textInputs = words.trim().replace(/\s+/g, " ");
      textInputs = textInputs.replace(/[^\w\s]/gi, "");
      let textInputsArray:any = textInputs.split(" ");

      setNoOfWords(textInputsArray.length);
      setNoOfChar(words.length);
      setOutputList(textInputsArray);
    }else{
      setOutputList([]);
    };
  };

  useEffect(() => {
    generateTableObjects();
  }, [outputList,searchVal]); 
  
  const generateTableObjects = () => {

    let outputListArrayOri:any = [...outputList];
    let outputListArrayCopy:any = [...outputList];
    let outputListArrayLength:number = outputListArrayOri.length;
    let finalList:any = [];
    let counter:number = 0;
    
    for(let i=0; i<outputListArrayLength; i++){
        counter = 0;
        for(let j=0; j<outputListArrayLength; j++){
          if(outputListArrayOri[i]===outputListArrayCopy[j]){
            counter++;
            delete outputListArrayCopy[j];
          }
        };
        if (counter>0){
          let tempObject = {
            value: "",
            count: 0
          };
          tempObject.value = outputListArrayOri[i];
          tempObject.count = counter;
          if (searchVal !== ""){
            if (tempObject.value.toUpperCase().includes(searchVal.toUpperCase())){
              finalList.push(tempObject);
            };
          }else{
            finalList.push(tempObject);
          };
        };  
    };
    setOutputListFinalObjects(finalList);
    mySort (finalList,generateTableType);
  };  

  const handleClick = (e:any) => {
    setGenerateTableType(e.target.id);
  };

  useEffect(() => {
    sortList(generateTableType);
  }, [generateTableType]);  

  const sortList = (e: any) => {                
    let objectToSort = [...outputListFinalObjects]
    if(e!=="default"){
      mySort (objectToSort,e);
      setOutputListFinalObjects(objectToSort);
    }else{
      generateTableObjects();
    };
  };

  const rendertable = () => {
    if(outputList.length===0){
      return <tr><td><p>-</p></td><td><p>Please insert text</p></td><td><p>-</p></td></tr>
    }else{
      return Object.entries(outputListFinalObjects).map((data, index) => (
        <tr key={index}><td>{index+1}</td><td>{data[1].value}</td><td>{data[1].count}</td></tr>                        
      ))
    };
  };

  return(
    <div className="container-sm">
      <div className="bannerImgDiv">
        <img className="img-fluid" src="https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/k68uhvefpuv5b6u4ds0k" width="400" alt=""/>
        <h2>React and Typescript Word Count Challenge</h2>
      </div>
      <h5>Insert words below</h5>
      <div className="row textAreaDiv">
        <textarea 
          id="myTextarea"
          maxLength={5000}
          className="form-control myText" 
          aria-label="Sizing example input" 
          aria-describedby="inputGroup-sizing-lg"
          onChange = {handleChange}
        />
      </div>
      <div className="row">
        <div className="col columnNumberDiv">
          <span className="badge rounded-pill bg-info text-dark bg-lg m-2">Total Characters: {noOfChar}/5000</span>
          <span className="badge rounded-pill bg-info text-dark bg-lg m-2">Total Words: {noOfWords}</span>
        </div>
      </div>
      <div className="row">
        <div className="col searchDiv">
            <span>Search: </span>
            <input type="text"  onChange= {e =>setSearchVal(e.target.value)} className="wordSearch" />           
        </div>
      </div>
      <div className="row">
        <div className="listTableDiv">          
          <div className="row">
            <div className="col resetDiv">
              <button type="button" id="default" onClick={handleClick} className="btn btn-outline-dark btn-sm m-2">Reset Sorting</button>
            </div>
          </div>
          <table className="table table-striped table-hover"> 
            <thead><tr><th className="myIdx"><span>Index</span></th><th>Words
            <button type="button" id="sortAscending" onClick={handleClick} className="btn btn-outline-secondary btn-sm m-2">&#8593;</button>
            <button type="button" id="sortDescending" onClick={handleClick} className="btn btn-outline-secondary btn-sm m-2">&#8595;</button>
            </th><th>Counts
            <button type="button" id="sortCountA" onClick={handleClick} className="btn btn-outline-secondary btn-sm m-2">&#8593;</button>
            <button type="button" id="sortCountD" onClick={handleClick} className="btn btn-outline-secondary btn-sm m-2">&#8595;</button>
            </th></tr></thead>
            <tbody>
              {rendertable()}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col assumptionsDiv">
          {assumptionsToggle ? "" : <button type="button" onClick={e =>setAssumptionsToggle(true)} className="btn btn-outline-dark btn-sm m-2">Show Assumptions</button>}
          {!assumptionsToggle ? "" : <button type="button" onClick={e =>setAssumptionsToggle(false)} className="btn btn-outline-dark btn-sm m-2">Hide Assumptions</button>}
          {assumptionsToggle ? <Assumptions /> : ""}
        </div>
      </div> 
    </div>
  );
}

const mySort = (myObj:any,type:String) =>{
  myObj.sort(
    function (x:any, y:any) {
      let a,b
      switch (type){
        case "sortAscending":
          a = x.value.toUpperCase(); 
          b = y.value.toUpperCase();  
          return a === b ? 0 : a > b ? 1 : -1;
        case "sortDescending":
          a = x.value.toUpperCase();
          b = y.value.toUpperCase();  
          return a === b ? 0 : a > b ? -1 : 1;
        case "sortCountA":
          return x.count - y.count;
        case "sortCountD":
          return y.count - x.count;
      };
  });  
};

export default Counter;