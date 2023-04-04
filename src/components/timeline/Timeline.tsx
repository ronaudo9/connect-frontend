import React from "react";
import Post from "../Post/Post";
import Share from "../share/Share";
import "./Timeline.css"

const Timeline = () => {
  return(
  <div className="timeline">
  <div className="timelineWrapper">
    <Share />
    <Post />
  </div>
  </div>
  );
};

export default Timeline;
