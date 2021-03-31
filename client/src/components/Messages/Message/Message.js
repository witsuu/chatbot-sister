import React from "react";

import "./Message.css";

export const Message = ({ message: { user, text, position }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundRight">
        <p className="sentText pr-10">{trimmedName}</p>
        <p className="messageText colorDark">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLeft">
        <p className="sentText pl-10">{user}</p>
        {position === "kategori" || position === "destinasi" ? (
          <ol
            dangerouslySetInnerHTML={{ __html: text }}
            className="align-left"
          ></ol>
        ) : (
          <div
            className="messageText colorDark"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
      </div>
    </div>
  );
};
