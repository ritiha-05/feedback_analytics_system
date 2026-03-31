import { useState, useEffect } from "react";
import api from "../services/api";

export default function FeedbackForm({ sessionId }) {
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchFeedback = async () => {
    try {
      const res = await api.get("/feedback");
      setFeedbackList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const submitFeedback = async () => {

    if (!message.trim()) {
      alert("Please enter feedback before submitting.");
      return;
    }

    try {
      await api.post("/feedback", {
        sessionId,
        message
      });

      setMessage("");
      fetchFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  const updateFeedback = async () => {

    if (!message.trim()) {
      alert("Feedback cannot be empty.");
      return;
    }

    try {
      await api.put(`/feedback/${editingId}`, {
        message
      });

      setEditingId(null);
      setMessage("");
      fetchFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (fb) => {
    setEditingId(fb._id);
    setMessage(fb.message);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Give Feedback</h3>

      <textarea
        placeholder="Type your feedback..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: 300,
          height: 100,
          padding: 10
        }}
      />

      <br />

      {editingId ? (
        <button onClick={updateFeedback} style={{ marginTop: 10 }}>
          Update
        </button>
      ) : (
        <button onClick={submitFeedback} style={{ marginTop: 10 }}>
          Submit
        </button>
      )}

      <div style={{ marginTop: 30 }}>
        <h4>Your Feedback</h4>

        {feedbackList.map((fb) => (
          <div
            key={fb._id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              width: 320
            }}
          >
            <p>{fb.message}</p>

            <button onClick={() => startEdit(fb)}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}