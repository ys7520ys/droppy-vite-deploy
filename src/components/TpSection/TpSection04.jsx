import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 추가!
const Tpsection04 = ({
  text,
  img,
  boxes = [],
  titleText,
  subTitleText,
  align = "center",
  onBoxEdit,
  isPreview = false, // 🔥 추가
}) => {
  const [localBoxes, setLocalBoxes] = useState(boxes);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const boxHeight = 550;
  const viewHeight = 1100;

  const insertShopifyProducts = () => {
    if (isPreview) return; // 🔥 미리보기 모드면 아예 동작 막기
    const products = window.shopifyProducts || [];
    const shopifyBoxes = products.map((product) => ({
      title: product.title,
      subtitle: product.price ? `${product.price}원` : "가격 정보 없음",
      description: product.description || "",
      imageClass: product.imageUrl || "",
    }));
    setLocalBoxes(shopifyBoxes);
    onBoxEdit?.({ boxes: shopifyBoxes });
    setCurrentPage(1);
  };
  const handleClickProduct = (box) => {
    if (isPreview) return; // 미리보기 모드면 클릭 막기
    navigate(`/product/${encodeURIComponent(box.title)}`, { state: { product: box } });
  };
  useEffect(() => {
    if (containerRef.current) {
      const visibleItemCount = Math.floor(viewHeight / boxHeight) * 4;
      setItemsPerPage(visibleItemCount);
    }
  }, [localBoxes]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBoxes = localBoxes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(localBoxes.length / itemsPerPage);

  const goToNextPage = () => {
    if (isPreview) return; // 🔥 미리보기 모드면 동작 막기
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (isPreview) return; // 🔥 미리보기 모드면 동작 막기
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section style={{ padding: 50, background: "#eee" }}>
      <div style={{ textAlign: align }}>
        <h2>{titleText}</h2>
        <p>{subTitleText}</p>
      </div>

      {/* 🔥 미리보기 아닐 때만 Shopify 버튼 보이기 */}
      {!isPreview && (
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <button
            onClick={insertShopifyProducts}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            🛒 Shopify 상품 가져오기
          </button>
        </div>
      )}

      {/* 상품 리스트 */}
      <div
        ref={containerRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          justifyContent: "center",
          minHeight: `${viewHeight}px`,
        }}
      >
        {currentBoxes.map((box, index) => (
          <div
            key={index}
            onClick={() => handleClickProduct(box)}
            style={{
              background: "white",
              border: "1px solid #ccc",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              height: `${boxHeight}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflow: "hidden",
              position: "relative",
              textAlign: "center",
              cursor: "pointer", // 🔥 클릭 가능한 느낌으로
            }}
          >
            {box.imageClass && (
              <div
                style={{
                  width: "100%",
                  height: 500,
                  backgroundImage: `url(${box.imageClass})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <div style={{ padding: "10px 10px 20px", flex: "1 1 auto" }}>
              <h3 style={{
                fontSize: "18px",
                marginBottom: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {box.title}
              </h3>
              <p style={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {box.subtitle}
              </p>
              {box.description && (
                <p style={{
                  fontSize: "14px",
                  color: "#666",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {box.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 미리보기 아닐 때만 페이지네이션 보이기 */}
      {!isPreview && totalPages > 1 && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            style={{
              marginRight: 10,
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: currentPage === 1 ? "#eee" : "white",
              cursor: currentPage === 1 ? "default" : "pointer",
            }}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => !isPreview && setCurrentPage(idx + 1)}
              style={{
                margin: "0 5px",
                padding: "8px 12px",
                borderRadius: "5px",
                border: currentPage === idx + 1 ? "2px solid black" : "1px solid #ccc",
                background: currentPage === idx + 1 ? "black" : "white",
                color: currentPage === idx + 1 ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{
              marginLeft: 10,
              padding: "8px 16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              background: currentPage === totalPages ? "#eee" : "white",
              cursor: currentPage === totalPages ? "default" : "pointer",
            }}
          >
            다음
          </button>
        </div>
      )}
    </section>
  );
};

export default Tpsection04;



