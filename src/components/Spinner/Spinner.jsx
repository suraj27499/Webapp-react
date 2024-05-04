import React, { useState, useEffect } from "react";
import "./Spinner.css";

const Spinner = ({ promise }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    promise
      .then(() => {
        if (isMounted) {
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [promise]);

  return loading ? (
    <div className="spinner-overlay">
      <div className="spinner" style={{ borderColor: "#52229e" }}></div>
    </div>
  ) : null;
};

export default Spinner;
