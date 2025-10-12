import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function MoreInfoPage() {
    const navigate = useNavigate();
    return (
        <div className="info-page">
            <h2>More Information</h2>
            <ul>
                <li>What to do if the water tank is empty? <br />
                    <span>Click "Refill Water Tank" on the dashboard. You can also record rainwater collection.</span>
                </li>
                <li>How to choose the right fertilizer? <br />
                    <span>Check the Nutrient Index panel for NPK advice.</span>
                </li>
                <li>How to reduce pest risk? <br />
                    <span>Monitor the Pest/Disease panel and follow the recommended pesticide.</span>
                </li>
            </ul>
            <button className="proceed-btn" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        </div>
    );
}

export default MoreInfoPage;