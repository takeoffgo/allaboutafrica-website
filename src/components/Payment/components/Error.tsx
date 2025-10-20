import React from "react";

export const Error: React.FC<{ error?: any[] }> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="message is-warning is-small">
      <div className="message-header">Payment processing issue</div>
      <div className="message-body">
        {typeof error === "string" ? (
          <p>{error}</p>
        ) : (
          <ul>
            {error.map((err: any, idx: number) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
