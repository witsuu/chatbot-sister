import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import "./Join.css";

export const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinContainer">
      <div className="card">
        <div className="card-body join-card">
          <h1 className="heading">SELAMAT DATANG</h1>
          <div>
            <input
              type="text"
              className="joinInput"
              placeholder="Masukkan Nama"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <Link
            to={`/chat?name=${name}&room=${uuid4()}`}
            onClick={(e) => (!name ? e.preventDeafult() : null)}
          >
            <input type="submit" value="Masuk" />
          </Link>
        </div>
      </div>
    </div>
  );
};
