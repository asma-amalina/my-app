import React from 'react';
import Counter from './components/counter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/counter.css';

const style = {
  backgroundColor: "rgb(255 253 253 / 45%)",
  borderRadius: "25px",
  maxWidth: "1400px"
};

const style2:any = {
  width: "100%",
  textAlign: "-webkit-center"
};

const App: React.FC = () =>{
  return(
    <div className="mainWrap" style={style2}>
      <div className="secondaryWrap" style={style}>
        <Counter />
      </div>
    </div>
  );
}

export default App;
