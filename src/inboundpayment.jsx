import React, { useState, useEffect } from 'react';

const PaymentUpload = () => {
  const [timer, setTimer] = useState(48 * 60 * 60); // 48 hours in seconds

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
       {/* <div className="flex-auto justify-start">
          <img
            className=" -mt-2"
            src={require("./assets/logo.png")}
            style={{ height: "50px" }}
            alt=""
          />
        </div> */}
      <div className="flex flex-col self-center px-4 py-4 mt-4 w-full max-w-3xl bg-white rounded-lg border-1 border-gray-300 shadow-md max-md:px-3 max-md:mt-4 max-md:max-w-full">
        <div className="text-2xl font-bold p-3 -ml-3 text-gray-900  max-md:max-w-full">
          Payment Document Upload for New Connection
        </div>
        <div className="mt-6 max-md:mt-4 max-md:max-w-full">
          <div className="flex gap-2 max-md:flex-col">
            <div className="flex flex-col w-6/12  max-md:w-full">
              <div className="flex flex-col grow  text-lg font-semibold text-gray-700 max-md:mt-3">
                <label className=" text-base">Applicant ID</label>
                <input
                  type="text"
                  className="w-full mt-1 h-10 text-base p-2 bg-white rounded-lg border border-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow  text-lg font-semibold text-gray-700 max-md:mt-3">
                <label className=" text-base">Payment due</label>
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 p-2 flex items-center pl-3 text-blue-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-8 mt-1 h-10 p-2 bg-white rounded-lg border border-gray-300"
                  />
                </div>
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
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    className="w-full h-10 p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="self-center px-8 py-2 mt-8 w-56 max-w-full text-lg font-semibold text-white whitespace-nowrap bg-violet-500 rounded-full shadow-sm max-md:px-3 max-md:mt-6">
  SUBMIT
</button>

      </div>
    </div>
  );
};

export default PaymentUpload;
