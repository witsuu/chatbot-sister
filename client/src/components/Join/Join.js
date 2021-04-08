import React from "react";
import { v4 as uuid4 } from "uuid";
import "./Join.css";

export const Join = () => {
  // const [name, setName] = useState("");

  return (
    <div className="JoinContainer">
      <div className="card">
        <div className="card-body join-card">
          <h1 className="heading">SELAMAT DATANG</h1>
          <form action={`/chat`} method="GET">
            <div>
              <input
                type="text"
                className="joinInput"
                placeholder="Masukkan Nama"
                // onChange={(event) => setName(event.target.value)}
                required
                name="name"
                autoComplete="off"
              />
              <input
                type="text"
                value={uuid4()}
                style={{ display: "none" }}
                name="room"
              />
            </div>
            <input type="submit" value="Masuk" />
          </form>
        </div>
      </div>
    </div>
  );
};
