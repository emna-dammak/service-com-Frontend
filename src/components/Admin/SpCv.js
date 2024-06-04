import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PdfImageExtractor from "../ServiceProvider/PdfImageExtractor";
import { Link } from "react-router-dom";

const SpCv = () => {
  const { id } = useParams();
  const [approvalStatus, setApprovalStatus] = useState({});
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await fetch(`${API_URL}user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProvider(data);
      } catch (error) {
        setError(error.message);
        console.error("Fetching data failed:", error);
      }
    };

    fetchProvider();
  }, [id]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_URL}user/approve/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setApprovalStatus({ ...approvalStatus, [id]: "approved" });
    } catch (error) {
      console.error("Approve action failed:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_URL}user/reject/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setApprovalStatus({ ...approvalStatus, [id]: "rejected" });
    } catch (error) {
      console.error("Reject action failed:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg flex justify-center items-center">
      <div
        className="border border-gray-200"
        style={{
          borderRadius: "5px",
          padding: "12px",
          boxShadow: "0px 4px 18px 0px rgba(75, 70, 92, 0.1)",
          backgroundColor: "rgba(241, 249, 243, 0.8)",
        }}
      >
        <div className="flex justify-center">
          <PdfImageExtractor pdfUrl={`/${provider.document}`} />
        </div>
        <div className="flex justify-center items-center mt-2">
          {approvalStatus[provider.id] === "approved" ? (
            <p
              className="text-green-600 mr-8"
              style={{ fontSize: "23px", fontWeight: "375" }}
            >
              Approved
            </p>
          ) : approvalStatus[provider.id] === "rejected" ? (
            <p
              className="text-red-600 mr-8"
              style={{ fontSize: "23px", fontWeight: "380" }}
            >
              Rejected
            </p>
          ) : (
            <>
              <button onClick={() => handleApprove(provider.id)}>
                <img src="/approve.svg" alt="icon1" className="w-8 h-9 mr-5" />
              </button>
              <button onClick={() => handleReject(provider.id)}>
                <img src="/reject.svg" alt="icon2" className="w-6 h-6 mr-4" />
              </button>
              <Link to={`/`}>
                <img src="/back.svg" alt="icon3" className="w-9 h-7 mr-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpCv;
