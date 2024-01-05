import { fetchHtmlContent } from "@/services/test";
import { useState, useRef, useEffect } from "react";

export const PopupComponent = ({ test, activeTab, setActiveTab, onClose }) => {
  const [blobUrl, setBlobUrl] = useState("");
  const fetchedRef = useRef(false); // Ref to indicate if the content has been fetched

  useEffect(() => {
    const loadHtmlContent = async () => {
      if (test.html && !fetchedRef.current) {
        fetchedRef.current = true; // Set the flag to indicate fetching
        try {
          const htmlContent = await fetchHtmlContent(test.html);
          const blob = new Blob([htmlContent], { type: "text/html" });
          const objectURL = URL.createObjectURL(blob);
          setBlobUrl(objectURL);
        } catch (error) {
          console.error("Error fetching HTML:", error);
          // Handle the error
        }
      }
    };

    if (activeTab === "report") {
      loadHtmlContent();
    }

    // Cleanup function
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(""); // Clear the blob URL
      }
      fetchedRef.current = false; // Reset the flag when the component unmounts or tab changes
    };
  }, [test.html, activeTab]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white border border-blue-gray-100 shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="tabs flex justify-around mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "report" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("report")}
          >
            Report
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </button>
        </div>
        <div className="content mb-4">
          {activeTab === "report" &&
            (test.html && blobUrl ? (
              <iframe
                src={blobUrl}
                style={{ width: "100%", height: "500px" }}
                title="File Content"
              ></iframe>
            ) : test.html ? (
              "Loading..."
            ) : (
              "No report available."
            ))}
          {activeTab === "video" && (
            <div>
              {test.video ? (
                <video src={test.video} controls style={{ maxWidth: "100%" }} />
              ) : (
                "No video available."
              )}
            </div>
          )}
        </div>
        <button
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
