import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentUpload = ({ amount, applicationID }) => {
  const [timer, setTimer] = useState(48 * 60 * 60); // 48 hours in seconds
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  /*   const uploadFile = async (row) => {
    try {
      const formData = new FormData();
      console.log(file);
      formData.append("file", file, file.name);
      const res = await axios.post(
        "https://content.kpdcl.net:8085/file/fileSystem",
        formData
      );
      let dataSplit = res.data.split("/");
      let fileName = dataSplit[4].split(" type")[0].split(" ").join("%20");
      let filePath =
        "/" + dataSplit[1] + "/" + dataSplit[2] + "/" + dataSplit[3] + "/";
      let folderURL = await checkInDoc(fileName, filePath, row.case_id);
      return folderURL;
    } catch (error) {
      console.log(error.message);
    }
  }; */

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const uploadFile = async () => {
    try {
     
      const formData = new FormData();

      formData.append("file", file, file.name);
      const res = await axios.post(
        "https://content.kpdcl.net:8085/file/fileSystem",
        formData
      );
      let dataSplit = res.data.split("/");
      let fileName = dataSplit[4].split(" type")[0].split(" ").join("%20");
      let filePath =
        "/" + dataSplit[1] + "/" + dataSplit[2] + "/" + dataSplit[3] + "/";
      let folderURL = await checkInDoc(fileName, filePath, applicationID);
      return folderURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkInDoc = async (fileName, filePath, caseId) => {
    try {
      let username = await localStorage.getItem("username");
      const url = `https://content.kpdcl.net/WCCService/resources/wccgeneric/checkin?fileName=${fileName}&filePath=/u01/oracle/docs/&consumerName=${caseId}_&serviceName=NewConnLoadApproval&dDocType=Domicile`;
      const res = await axios.get(url);
      console.log("checkin:", res.data);
      if (res.data.status === "success") {
      } else {
        alert("Unable to upload file.");
      }
      return res.data.folderURL;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        alert('file upload is mandatory');
        return;
      }
      let folderURL = await uploadFile();
      const response = await axios.post(
        "https://kpdclcrm.kpdcl.net:8089/payment_status_update",
        {
          case_id: applicationID,
          payment_status: folderURL?1:0,
          receipt_url: folderURL,
        }
      );
      alert('Payment document uploaded successfully.')
    } catch (error) {
      if(error.response.data=='Case ID already exist'){
        alert('Case ID already exist');
      }else if(error.response.data==='Case ID not found'){
        alert('Case ID not found');        
      }else{
        alert('Something went wrong');
      }
      
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
    <img
    className=" p-1 h-14 "
    src={require("./assets/logo.png")}
    alt="Logo"
  />
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
     
  


      <div className="flex flex-col self-center -mt-20 px-4 py-4 mt-4 w-full max-w-3xl bg-white rounded-lg border-1 border-gray-300 shadow-md max-md:px-3 max-md:mt-4 max-md:max-w-full">
        <div className="text-2xl font-bold p-3 -ml-3 text-gray-900  max-md:max-w-full">
          Payment Document Upload for New Connection
        </div>
        <div className="mt-6 max-md:mt-4 max-md:max-w-full">
          <div className="flex gap-2 max-md:flex-col">
            <div className="flex flex-col w-6/12  max-md:w-full">
              <div className="flex flex-col grow  text-lg font-semibold text-gray-700 max-md:mt-3">
                <label className=" text-base">Application ID</label>
                <p className="border-2 p-2 rounded-md">{applicationID}</p>
              </div>
            </div>

            <div className="flex flex-col w-6/12  max-md:w-full">
              <div className="flex flex-col grow  text-lg font-semibold text-gray-700 max-md:mt-3">
                <label className=" text-base">Payment due</label>
                  <p className="text-blue-500 border-2 rounded-md p-2">
                    ₹{amount}
                  </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 max-md:max-w-full">
          <div className="flex  max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col mt-1.5 text-lg  font-semibold text-red-500 max-md:mt-6 max-md:max-w-full">
                <div className="max-md:max-w-full  text-base">
                  NOTE: Please pay to JK Bank and upload the bank receipt within
                </div>

                <div className="flex gap-1 self-center text-lg font-bold text-black">
                  <div>Timer :</div>
                  <div>{formatTime(timer)}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-4 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-lg font-semibold -ml-1 text-gray-700 max-md:mt-6 max-md:max-w-full">
                <label className="max-md:max-w-full text-base ">
                  Copy of Payment Document (pdf/jpg/jpeg)
                </label>

                <div className="w-full mt-1 text-base p-2 bg-white rounded-lg border border-gray-300">
                  <input
                    type="file"
                    accept="image/png, image/jpeg,image/jpg, application/pdf"
                    className="w-full h-10 p-2"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="self-center px-8 py-2 mt-14 mb-3 w-56 max-w-full text-lg font-semibold text-white whitespace-nowrap bg-violet-500 rounded-full shadow-sm max-md:px-3 max-md:mt-6 hover:font-semibold transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-xl"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
    </div>
  );
};

export default PaymentUpload;
