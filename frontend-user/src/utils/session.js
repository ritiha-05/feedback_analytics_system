export function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    sessionId = "session-" + Date.now();
    localStorage.setItem("sessionId", sessionId);
  }

  return sessionId;
}
