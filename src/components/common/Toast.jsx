import React from "react";
export default function Toast({ message, type = "success" }) {
  return message ? (
    <div role="status" className={"alert alert-" + type}>
      {message}
    </div>
  ) : null;
}
