import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentUpload from "./inboundpayment";

function App() {
  const [amount, setAmount] = React.useState();
  const [applicationID, setApplicationID] = React.useState();
  React.useEffect(() => {
    const urlParams = window.location.href.split("?")[1];

    if (urlParams) {
      // Extracting applicationID using regex
      const regex = /a=([^&]*)/;
      const match = urlParams.match(regex);
      if (match && match[1]) {
        setApplicationID(match[1]);
        console.log("APPLICATION ID:", match[1]);
      }

      const amountMatch = urlParams.split("p=")[1];
      if (amountMatch) {
        setAmount(amountMatch);
        console.log("AMOUNT:", amountMatch);
      }
    }
  }, []);

  return (
    <div className="main">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PaymentUpload applicationID={applicationID} amount={amount} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
