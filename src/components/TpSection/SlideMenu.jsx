import React from "react";
import ComponentItem from "./ComponentItem";

const SlideMenu = ({ activeTab, setActiveTab, tabItems, onBeginDrag, verticalList }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 0",
          borderBottom: "1px solid #ccc",
        }}
      >
        {Object.keys(tabItems).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (typeof onBeginDrag === 'function') onBeginDrag();
            }}
            style={{
              margin: "0 12px",
              background: activeTab === tab ? "#000" : "transparent",
              color: activeTab === tab ? "#fff" : "#000",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              borderRadius: 6,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* 컴포넌트 박스 세로/가로 나열 */}
      <div
        style={verticalList ? {
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 8,
          background: "#e0e0e0",
        } : {
          display: "flex",
          flexDirection: "row",
          gap: 20,
          padding: 20,
          justifyContent: "center",
          background: "#f9f9f9",
        }}
      >
        {tabItems[activeTab].map((item) => (
          <ComponentItem
            key={item.type}
            type={item.type}
            label={item.label}
            style={verticalList ? {
              minHeight: 120,
              borderRadius: 16,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 0,
              marginTop: 0,
              padding: 32,
            } : {
              background: "#fff",
              padding: 50,
              borderBottom: "1px solid #ccc",
              borderRadius: 8,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
              minWidth: 180,
              minHeight: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideMenu;
