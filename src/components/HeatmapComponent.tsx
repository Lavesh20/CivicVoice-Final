import React from "react";

const HeatmapComponent: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="http://localhost:5001/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Heatmap"
      />
    </div>
  );
};

export default HeatmapComponent;
