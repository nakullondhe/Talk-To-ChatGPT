import React, { useEffect } from "react";
// import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import { ZoomMtg } from "@zoomus/websdk";

// ZoomMtg.i18n.load("en-US");
// ZoomMtg.i18n.reload("en-US");

const Zoom = () => {  
  const join_meeting = (signature) => {
    document.getElementById("zmmtg-root").style.display = "block";
    ZoomMtg.init({
      leaveUrl: "http://localhost:3000",
      isSupportAV: true,
      success: (success) => {
        ZoomMtg.join({
          sdkKey: "LVZR0ZHFSmqECiZJYaQ_4w",
          signature: signature,
          meetingNumber: "2241758295",
          passWord: "9CAVV2",
          userName: "ZoomGPT",
          userEmail: "nakulprivate27@gmail.com",
          success: (success) => {
            console.log(success);
            handleMeetingEvents(ZoomMtg);
          },
          error: (error) => {
            console.log(error);
          },

        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  const getSignature = async () => {
    const response = await fetch("http://localhost:5000/auth_endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingNumber: "2241758295",
        role: 0,
      }),
    });
    const data = await response.json();
    join_meeting(data.signature);
  };

  const handleMeetingEvents = () => {
    ZoomMtg.inMeetingServiceListener("onMediaCaptureStatusChange", (data) => {
      console.log("onMediaCaptureStatusChange", data);
    })
  }

  useEffect(() => {
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    ZoomMtg.i18n.load('en-US')
    ZoomMtg.i18n.reload('en-US')
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.13.0/lib", "/av");
    getSignature();
  }, []);

  return (
    <div id="meetingSDKElement">
      {/* Meeting SDK renders here when a user starts or joins a Zoom meeting  */}
    </div>
  );
};

export default Zoom;
