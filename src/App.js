import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PaymentUpload from "./inboundpayment";




function App() {
  return (
    <div className="main">
     <Router>
      <Routes>
         <Route path="/" element={< PaymentUpload/>} />
      
      
      </Routes>
     </Router>
    </div>
  );
}

export default App;
