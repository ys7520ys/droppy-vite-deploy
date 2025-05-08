// ✅ TpEventGrid.jsx (행사 추가 버튼 + 개수 반영 포함)
import React, { useState } from "react";
import "swiper/css";

const defaultEvents = [
  {
    id: 1,
    type: "Exhibition",
    title: "Blossom The Hope 2023",
    date: "2023.09.01 - 09.05",
    thumbnail: "",
  },
  {
    id: 2,
    type: "Exhibition",
    title: "2203 뉴질랜드 정부 교육 박람회",
    date: "2023.08.24 - 08.30",
    thumbnail: "",
  },
  {
    id: 3,
    type: "Convention",
    title: "2023 세계 제약ㆍ바이오ㆍ건강기능 산업 전시회",
    date: "2023.05.26 - 08.25",
    thumbnail: "",
  },
];

const TpEventGrid = ({ data = defaultEvents, onUpdate }) => {
  const [events, setEvents] = useState(data);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues(item);
  };

  const handleSave = () => {
    const updated = events.map((e) => (e.id === editingId ? editValues : e));
    setEvents(updated);
    setEditingId(null);
    setEditValues({});
    onUpdate?.({ data: updated });
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: Date.now(),
      type: "Event",
      title: "New Event Title",
      date: "2025.01.01 - 01.03",
      thumbnail: "",
    };
    const updated = [newEvent, ...events];
    setEvents(updated);
    onUpdate?.({ data: updated });
  };

  return (
    <section style={{ padding: 60, background: "#fff", color: "#000" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 32 }}>
          진행 중인 행사 <span style={{ fontSize: 16, color: "#888" }}>{events.length}</span>
        </h2>
        <button
          onClick={handleAddEvent}
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 16px",
            fontSize: "14px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          + 행사 추가하기
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: 24,
        }}
      >
        {events.map((event) => (
          <div key={event.id} style={{ border: "1px solid #ddd", padding: 20, borderRadius: 10, position: "relative" }}>
            {event.thumbnail && (
              <img
                src={event.thumbnail}
                alt={event.title}
                style={{ width: "100%", borderRadius: 10, marginBottom: 12 }}
              />
            )}

            <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>• {event.type}</div>

            {editingId === event.id ? (
              <>
                <input
                  value={editValues.title}
                  onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                  style={{ width: "100%", fontSize: 16, fontWeight: "bold", marginBottom: 8 }}
                />
                <input
                  value={editValues.date}
                  onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
                  style={{ width: "100%", fontSize: 14, color: "#555" }}
                />
                <button onClick={handleSave} style={{ marginTop: 10, fontSize: 14 }}>저장</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 16, fontWeight: "bold", marginBottom: 4 }}>{event.title}</div>
                <div style={{ fontSize: 14, color: "#555" }}>{event.date}</div>
                <button onClick={() => handleEdit(event)} style={{ marginTop: 10, fontSize: 12, color: "#666" }}>수정</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TpEventGrid;