const sessionIdUserMap = new Map();

function setUser(id, user) {
  sessionIdUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdUserMap.get(id);
}

function removeUser(sessionId) {
  if (sessionIdUserMap.has(sessionId)) {
    sessionIdUserMap.delete(sessionId);
    console.log(`Session ${sessionId} removed successfully.`);
  } else {
    console.log("Session not found or already cleared.");
  }
}

module.exports = { setUser, getUser, removeUser };
