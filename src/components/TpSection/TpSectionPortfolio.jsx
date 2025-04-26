import React, { useState } from "react";

const TpSectionPortfolio = ({ data = [], onUpdate }) => {
  const [cards, setCards] = useState(data.length ? data : [
    {
      id: 1,
      mediaType: "image",
      mediaUrl: "https://via.placeholder.com/300x400?text=Sample1",
      brand: "boribori",
      description: "app renewal ux design",
    },
    {
      id: 2,
      mediaType: "image",
      mediaUrl: "https://via.placeholder.com/300x400?text=Sample2",
      brand: "SSF SHOP",
      description: "2023 fall lookbook",
    },
  ]);

  const [editingCardId, setEditingCardId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const openModal = (card) => {
    setEditingCardId(card.id);
    setEditValues({ ...card });
  };

  const closeModal = () => {
    setEditingCardId(null);
    setEditValues({});
  };

  const handleSave = () => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === editingCardId ? { ...editValues } : card
      )
    );
    if (onUpdate) onUpdate({ data: cards });
    closeModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const mediaUrl = URL.createObjectURL(file);
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    setEditValues((prev) => ({
      ...prev,
      mediaUrl,
      mediaType,
    }));
  };

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      mediaType: "image",
      mediaUrl: "https://via.placeholder.com/300x400?text=New+Image",
      brand: "New Brand",
      description: "New Description",
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    if (onUpdate) onUpdate({ data: updatedCards });
  };

  return (
    <section className="tpSectionPortfolio">
      <style>
        {`
          .tpSectionPortfolio {
            padding: 40px;
            background: #fff;
          }
          .tpSectionPortfolio__grid {
            width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
          }
          .tpSectionPortfolio__card {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .tpSectionPortfolio__card:hover {
            transform: scale(1.03);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          .tpSectionPortfolio__card img,
          .tpSectionPortfolio__card video {
            width: 100%;
            height: 500px;
            object-fit: cover;
            display: block;
          }
            .tpSectionPortfolio__deleteButton {
                position: absolute;
                top: 8px;
                right: 8px;
                background: rgba(255, 0, 0, 0.8);
                border: none;
                color: white;
                font-size: 16px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 2;
            }
                .tpSectionPortfolio__deleteButton:hover {
                background: red;
            }


          .tpSectionPortfolio__text {
            padding: 12px;
            background-color: white;
          }
          .tpSectionPortfolio__text h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .tpSectionPortfolio__text p {
            font-size: 14px;
            color: #666;
          }
          .tpSectionPortfolio__modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
          }
          .tpSectionPortfolio__modalContent {
            background: white;
            padding: 24px;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
          }
          .tpSectionPortfolio__modalContent label {
            display: block;
            margin-top: 12px;
            font-weight: bold;
          }
          .tpSectionPortfolio__modalContent input,
          .tpSectionPortfolio__modalContent textarea {
            width: 100%;
            padding: 8px;
            margin-top: 6px;
            border-radius: 6px;
            border: 1px solid #ccc;
          }
          .tpSectionPortfolio__buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }
          .tpSectionPortfolio__buttons button {
            flex: 1;
            margin: 0 4px;
            padding: 10px 0;
            font-weight: bold;
            background: #222;
            color: #fff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s ease;
          }
          .tpSectionPortfolio__buttons button:hover {
            background: #000;
          }
          .tpSectionPortfolio__addButton {
            margin-top: 20px;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 8px;
            background: #007bff;
            color: white;
            cursor: pointer;
            transition: background 0.3s;
          }
          .tpSectionPortfolio__addButton:hover {
            background: #0056b3;
          }
        `}
      </style>

      <div className="tpSectionPortfolio__grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className="tpSectionPortfolio__card"
            onClick={() => openModal(card)}
          >
            {card.mediaType === "image" ? (
              <img src={card.mediaUrl} alt={card.brand} />
            ) : (
              <video src={card.mediaUrl} autoPlay muted loop />
            )}
            <div className="tpSectionPortfolio__text">
              <h3>{card.brand}</h3>
              <p>{card.description}</p>
            </div>
            <button
                className="tpSectionPortfolio__deleteButton"
                onClick={(e) => {
                e.stopPropagation(); // 카드 클릭 막기
                const updatedCards = cards.filter((c) => c.id !== card.id);
                setCards(updatedCards);
                if (onUpdate) onUpdate({ data: updatedCards });
                }}
            >
                ×
            </button>
          </div>
        ))}
      </div>

      {/* ✅ 추가 버튼 */}
      <div style={{ textAlign: "center" }}>
        <button className="tpSectionPortfolio__addButton" onClick={handleAddCard}>
          + 카드 추가하기
        </button>
      </div>

      {/* ✅ 모달 */}
      {editingCardId !== null && (
        <div className="tpSectionPortfolio__modal">
          <div className="tpSectionPortfolio__modalContent">
            <h2>포트폴리오 카드 수정</h2>

            <label>이미지 또는 영상 선택</label>
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} />

            <label>브랜드명</label>
            <input
              type="text"
              value={editValues.brand}
              onChange={(e) =>
                setEditValues((prev) => ({ ...prev, brand: e.target.value }))
              }
            />

            <label>설명</label>
            <textarea
              value={editValues.description}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <div className="tpSectionPortfolio__buttons">
              <button onClick={handleSave}>저장</button>
              <button onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TpSectionPortfolio;
