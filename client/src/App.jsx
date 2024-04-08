import React, { useEffect, useState } from "react";

import { RouterProvider } from "react-router-dom";
import router from "./utils/router";
import { Download } from "lucide-react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      console.log("first");
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // Reset the deferred prompt so it can be used again
        setDeferredPrompt(null);
      });
    }
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    });
  }, [deferredPrompt]);
  return (
    <>
      <button
        style={{
          position: "absolute",
          zIndex: 100,
          top: "10px",
          right: "10px",
        }}
        onClick={handleInstallClick}
        className="px-2 py-2 bg-white-500 text-white rounded hover:bg-blue-700"
      >
        <Download />
      </button>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
