import { fetchHtmlContent } from "@/services/test";
import { Button } from "@material-tailwind/react";
import { useState, useRef, useEffect } from "react";
import {
  ShareIcon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

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

  const handleCopyLinks = async () => {
    const videoLink = test.video ? `Video Link: ${test.video}\n` : "";
    const htmlLink = test.html ? `HTML Link: ${test.html}\n` : "";
    const combinedLinks = `${videoLink}${htmlLink}`;

    if (!combinedLinks) {
      // console.log("No links available to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(combinedLinks);
      // console.log("Links copied to clipboard"); // Replace with user-friendly feedback
    } catch (err) {
      // console.error("Failed to copy links: ", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white border border-blue-gray-100 shadow-lg rounded-lg p-6 max-w-md w-full">
        <div>
          <Button
            className="py-2 px-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="tabs flex justify-around mb-4">
          <Button
            className={`py-2 px-4 rounded ${
              activeTab === "report" ? "bg-blue-500 text-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("report")}
          >
            Report
          </Button>
          <Button
            className={`py-2 px-4 rounded ${
              activeTab === "video" ? "bg-blue-500 text-white" : "bg-gray-400"
            }`}
            onClick={() => setActiveTab("video")}
          >
            Video
          </Button>
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
        <div className="flex flex-col items-center justify-center">
          <Button
            className="flex flex-col items-center justify-center py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleCopyLinks}
          >
            <ClipboardDocumentCheckIcon className="h-5 w-5" />
            <div className="">Copy Reports</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
