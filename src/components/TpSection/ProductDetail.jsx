import { useLocation } from "react-router-dom";
import { useState } from "react";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20px" }}>
      <div style={{ display: "flex", gap: "40px" }}>
        {/* 왼쪽 - 상품 이미지 */}
        <div style={{ flex: "1" }}>
          <div style={{
            width: "100%",
            paddingBottom: "100%",
            backgroundImage: `url(${product.imageClass})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }} />
          {/* 썸네일 영역 추가 가능 */}
        </div>

        {/* 오른쪽 - 상품 정보 */}
        <div style={{ flex: "1" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>{product.title}</h1>
          <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            {product.subtitle}
          </p>

          {/* 수량 선택 */}
          <div style={{ marginBottom: "20px" }}>
            <span style={{ marginRight: "10px" }}>수량:</span>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          {/* 장바구니 & 구매 버튼 */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
            <button style={{
              flex: 1,
              padding: "12px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              🛒 장바구니
            </button>
            <button style={{
              flex: 1,
              padding: "12px 20px",
              backgroundColor: "#ff5c5c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              바로구매
            </button>
          </div>

          {/* 간단한 설명 */}
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            {product.description}
          </p>
        </div>
      </div>

      {/* 상품 상세 설명 영역 */}
      <div style={{ marginTop: "80px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>상품 상세 설명</h2>
        <div style={{
          background: "#fafafa",
          padding: "30px",
          borderRadius: "10px",
          lineHeight: "1.8",
          color: "#333"
        }}>
          {/* 나중에 여기에 상세 이미지나 설명 추가 가능 */}
          {product.description || "상품 상세 설명 준비중입니다."}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
