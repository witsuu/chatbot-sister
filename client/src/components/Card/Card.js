import React from "react";

import "./Card.css";

export const Card = ({ children }) => (
  <div className="textContainer">
    <div>
      <h1 className="title">Users chatting</h1>
      <div className="card">
        <div className="card-body message-card">{children}</div>
      </div>
    </div>
  </div>
);
