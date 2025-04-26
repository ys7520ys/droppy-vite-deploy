// ✅ TpTeamStructure.jsx (상위 역할 + 하위 항목 추가/삭제 가능 + 모달 + 등장 애니메이션)
import React, { useState } from "react";
import { motion } from "framer-motion";

const TpTeamStructure = ({ data = [], onUpdate }) => {
  const [sections, setSections] = useState(
    data.length ? data : [
      {
        number: "①",
        title: "Project Manager",
        items: [
          { en: "Project Planning", ko: "프로젝트 일정관리", detail: "전체 일정 조율 및 계획 수립" },
          { en: "Contents Organization", ko: "콘텐츠 정리", detail: "콘텐츠 항목 분류 및 구조화" },
        ],
      },
    ]
  );

  const [modal, setModal] = useState({ visible: false, item: null });

  const handleClickItem = (item) => {
    setModal({ visible: true, item });
  };

  const handleAddSection = () => {
    const nextNumber = `⓿①②③④⑤⑥⑦⑧⑨`[sections.length + 1] || "⑤";
    const newSection = {
      number: nextNumber,
      title: "New Role",
      items: [
        { en: "New Item", ko: "새 항목", detail: "설명을 입력하세요" },
      ],
    };
    const updated = [...sections, newSection];
    setSections(updated);
    onUpdate?.({ data: updated });
  };

  const handleDeleteSection = (secIdx) => {
    const updated = sections.filter((_, i) => i !== secIdx);
    setSections(updated);
    onUpdate?.({ data: updated });
  };

  const handleAddItem = (secIdx) => {
    const updated = [...sections];
    updated[secIdx].items.push({ en: "New Item", ko: "새 항목", detail: "설명을 입력하세요" });
    setSections(updated);
    onUpdate?.({ data: updated });
  };

  const handleDeleteItem = (secIdx, itemIdx) => {
    const updated = [...sections];
    updated[secIdx].items.splice(itemIdx, 1);
    setSections(updated);
    onUpdate?.({ data: updated });
  };

  return (
    <section style={{ background: "#fff", color: "#000", padding: "80px 40px" }}>
      <h2 style={{ fontSize: "48px", fontWeight: 700, marginBottom: "60px", textAlign: "center" }}>
        Beyond Creative<br /> ItddaaSoft
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {sections.map((sec, secIdx) => (
          <motion.div
            key={secIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: secIdx * 0.1 }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                position: "relative",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  height: "24px",
                  lineHeight: "24px",
                  textAlign: "center",
                  borderRadius: "50%",
                  border: "1px solid #000",
                  fontSize: "14px",
                }}
              >
                {sec.number}
              </span>
              {sec.title}
              <span
                onClick={() => handleDeleteSection(secIdx)}
                style={{ position: "absolute", right: 0, color: "red", cursor: "pointer" }}
              >
                ×
              </span>
            </h3>

            <ul style={{ paddingLeft: "16px", fontSize: "15px", lineHeight: 1.8 }}>
              {sec.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  onClick={() => handleClickItem(item)}
                  style={{ listStyle: "disc", cursor: "pointer", position: "relative" }}
                >
                  {item.en}
                  <br />
                  <span style={{ fontSize: "13px", color: "#555" }}>{item.ko}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(secIdx, itemIdx);
                    }}
                    style={{
                      position: "absolute",
                      right: -24,
                      top: 0,
                      color: "red",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleAddItem(secIdx)}
              style={{
                marginTop: "10px",
                fontSize: "13px",
                padding: "4px 8px",
                border: "1px solid #000",
                borderRadius: "6px",
                cursor: "pointer",
                background: "#f7f7f7",
              }}
            >
              + 항목 추가
            </button>
          </motion.div>
        ))}
      </div>

      {/* ✅ 상위 역할 추가 버튼 */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <button
          onClick={handleAddSection}
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + 역할 추가하기
        </button>
      </div>

      {/* 상세 모달 */}
      {modal.visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
          onClick={() => setModal({ visible: false, item: null })}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{modal.item.en}</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>{modal.item.ko}</p>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>{modal.item.detail}</p>
            <button
              onClick={() => setModal({ visible: false, item: null })}
              style={{
                marginTop: "20px",
                padding: "8px 16px",
                border: "none",
                background: "#000",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TpTeamStructure; 