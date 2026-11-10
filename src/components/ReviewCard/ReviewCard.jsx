import SummaryCell from "../SummaryCell/SummaryCell.jsx";

export default function ReviewCard({ site, device, port, comment }) {
  return (
    <div className="review">
      <SummaryCell label="Site" value={site.name} />
      <SummaryCell label="Device" value={device.name} />
      <SummaryCell label="Floor" value={device.floor} />
      <SummaryCell label="Port" value={port} />
      <SummaryCell label="Purpose" value={comment.trim() || "No comment provided"} span2 />
    </div>
  );
}
