// // AdminPage.jsx
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase"; // firebase.js에서 export한 db
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// const AdminPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, "orders"), orderBy("user.name")); // 이름 순 정렬 (필요 시 createdAt으로 바꿔도 됨)

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(newOrders);
//     });

//     return () => unsubscribe(); // 컴포넌트 언마운트 시 실시간 리스너 정리
//   }, []);

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>📦 고객 주문 내역</h1>

//       {orders.length === 0 ? (
//         <p>현재 접수된 주문이 없습니다.</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//           <thead>
//             <tr style={{ background: "#f1f1f1" }}>
//               <th style={thStyle}>주문 ID</th>
//               <th style={thStyle}>고객명</th>
//               <th style={thStyle}>이메일</th>
//               <th style={thStyle}>구성 컴포넌트</th>
//             </tr>
//           </thead>
//           <tbody style={{ color: "white"}}>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td style={tdStyle}>{order.id}</td>
//                 <td style={tdStyle}>{order.user?.name || "없음"}</td>
//                 <td style={tdStyle}>{order.user?.email || "없음"}</td>
//                 <td style={tdStyle}>
//                   <ul style={{ paddingLeft: "20px" }}>
//                     {order.components?.map((comp, idx) => (
//                       <li key={idx}>{comp.type}</li>
//                     ))}
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const thStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   textAlign: "left",
//   fontWeight: "bold",
// };

// const tdStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
// };

// export default AdminPage;



// AdminPage.jsx (수정된 텍스트 및 이미지 URL 포함)
// Tpsection04.jsx (box__img SCSS와 구조 일치 + backgroundImage 제대로 적용)
// AdminPage.jsx - section04_edits 내용 조회
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// const AdminPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [edits, setEdits] = useState([]);

//   useEffect(() => {
//     const q1 = query(collection(db, "orders"), orderBy("user.name"));
//     const unsubscribeOrders = onSnapshot(q1, (snapshot) => {
//       const newOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setOrders(newOrders);
//     });

//     const q2 = query(collection(db, "section04_edits"));
//     const unsubscribeEdits = onSnapshot(q2, (snapshot) => {
//       const newEdits = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setEdits(newEdits);
//     });

//     return () => {
//       unsubscribeOrders();
//       unsubscribeEdits();
//     };
//   }, []);

//   const renderEditDetails = (component, index) => {
//     if (!component.editedBoxes || !Array.isArray(component.editedBoxes)) return null;
//     return (
//       <ul style={{ paddingLeft: "10px", fontSize: "14px", color: "#555" }}>
//         {component.editedBoxes.map((box, i) => (
//           <li key={i}>
//             박스{i + 1}
//             <br />
//             title: {box.title}<br />
//             subtitle: {box.subtitle}<br />
//             description: {box.description}<br />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>📦 고객 주문 내역 + Section04 수정</h1>

//       {orders.length === 0 ? (
//         <p>현재 접수된 주문이 없습니다.</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//           <thead>
//             <tr style={{ background: "#f1f1f1" }}>
//               <th style={thStyle}>주문 ID</th>
//               <th style={thStyle}>고객명</th>
//               <th style={thStyle}>이메일</th>
//               <th style={thStyle}>컴포넌트</th>
//               <th style={thStyle}>수정된 텍스트</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td style={tdStyle}>{order.id}</td>
//                 <td style={tdStyle}>{order.user?.name}</td>
//                 <td style={tdStyle}>{order.user?.email}</td>
//                 <td style={tdStyle}>
//                   <ul>
//                     {order.components?.map((c, i) => (
//                       <li key={i}>{c.type}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td style={tdStyle}>
//                   {order.components?.map((c, i) => (
//                     <div key={i}>
//                       <strong>{c.type}</strong>
//                       {c.type === "섹션04" && renderEditDetails(c, i)}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const thStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   textAlign: "left",
//   fontWeight: "bold"
// };

// const tdStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   verticalAlign: "top"
// };

// export default AdminPage;


// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시
// AdminPage.jsx - 구성된 컴포넌트 + section04 편집 내역 표시 + TpPage03에서 전달된 박스 텍스트 표시













//1
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

// const AdminPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const q = query(collection(db, "orders"), orderBy("user.name"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const newOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(newOrders);
//     });
//     return () => unsubscribe();
//   }, []);

//   const renderEditDetails = (component) => {
//     if (!component.boxes || !Array.isArray(component.boxes)) return null;
//     return (
//       <ul style={{ paddingLeft: "10px", fontSize: "14px", color: "#555" }}>
//         {component.boxes.map((box, i) => (
//           <li key={i} style={{ marginBottom: "10px", whiteSpace: "pre-line" }}>
//             {`박스${i + 1}\ntitle: ${box.title}\nsubtitle: ${box.subtitle}\ndescription: ${box.description}`}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>📦 고객 주문 내역 + Section04 수정</h1>

//       {orders.length === 0 ? (
//         <p>현재 접수된 주문이 없습니다.</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
//           <thead>
//             <tr style={{ background: "#f1f1f1" }}>
//               <th style={thStyle}>주문 ID</th>
//               <th style={thStyle}>고객명</th>
//               <th style={thStyle}>이메일</th>
//               <th style={thStyle}>컴포넌트</th>
//               <th style={thStyle}>수정된 텍스트</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id}>
//                 <td style={tdStyle}>{order.id}</td>
//                 <td style={tdStyle}>{order.user?.name}</td>
//                 <td style={tdStyle}>{order.user?.email}</td>
//                 <td style={tdStyle}>
//                   <ul>
//                     {order.components?.map((c, i) => (
//                       <li key={i}>{c.type}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td style={tdStyle}>
//                   {order.components?.map((c, i) => (
//                     <div key={i} style={{ marginBottom: "10px" }}>
//                       {c.type === "섹션04" && renderEditDetails(c)}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// const thStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   textAlign: "left",
//   fontWeight: "bold"
// };

// const tdStyle = {
//   padding: "10px",
//   border: "1px solid #ccc",
//   verticalAlign: "top",
//   whiteSpace: "pre-line"
// };

// export default AdminPage;










import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("user.name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(newOrders);
    });
    return () => unsubscribe();
  }, []);

  // ✅ 각 컴포넌트 유형별 상세 렌더링 함수들
  const renderBanner04Details = (c) => (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ background: "#eef2f6", padding: "10px 14px", borderRadius: "6px", marginBottom: "10px" }}>
        <strong>🎬 배너04</strong><br />
        <strong>제목:</strong> {c.title || "(제목 없음)"}<br />
        <strong>서브제목:</strong> {c.subTitle || "(서브제목 없음)"}<br />
        <strong>정렬:</strong> {c.align || "기본값"}<br />
      </div>
      {c.mediaUrl && (
        c.mediaType === "video" ? (
          <video src={c.mediaUrl} controls style={{ width: "300px", borderRadius: "8px" }} />
        ) : (
          <img src={c.mediaUrl} alt="배너 이미지" style={{ width: "300px", borderRadius: "8px" }} />
        )
      )}
    </div>
  );

  const renderSection02Details = (c) => (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ background: "#eef2f6", padding: 10, borderRadius: "6px", marginBottom: 10 }}>
        <strong>✅ [섹션02 상단 텍스트]</strong><br />
        <strong>텍스트:</strong> {c.text?.split('\n').map((t, i) => (<span key={i}>{t}<br /></span>)) || "(없음)"}<br />
        <strong>정렬:</strong> {c.align || "center"}
      </div>
    </div>
  );

  const renderSection04Details = (c) => {
    const boxes = Array.isArray(c.boxes) ? c.boxes : [];
    return (
      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "#eef2f6", padding: 10, marginBottom: 10 }}>
          <strong>✅ [섹션04 상단 텍스트]</strong><br />
          <strong>제목:</strong> {c.titleText || "(제목 없음)"}<br />
          <strong>서브제목:</strong> {c.subTitleText || "(서브제목 없음)"}<br />
          <strong>정렬:</strong> {c.align || "left"}
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {boxes.map((box, i) => (
            <div key={i} style={{ width: "250px", padding: "10px", background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "4px" }}>
              <strong>📦 04박스 {i + 1}</strong><br />
              <span>title: {box.title}</span><br />
              <span>subtitle: {box.subtitle}</span><br />
              <span>description: {box.description}</span><br />
              {box.imageClass?.startsWith("http") && (
                <img src={box.imageClass} alt="" style={{ width: "100%", marginTop: "8px", borderRadius: "4px" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSection06Details = (c) => {
    const data = c.data || [];
    return (
      <div style={{ marginBottom: "24px" }}>
        <div style={{ background: "#eef2f6", padding: 10, marginBottom: 10 }}>
          <strong>✅ [섹션06 상단 텍스트]</strong><br />
          <strong>제목:</strong> {c.titleText || "(제목 없음)"}<br />
          <strong>서브제목:</strong> {c.subTitleText || "(서브제목 없음)"}<br />
          <strong>정렬:</strong> {c.align || "left"}
        </div>
        <ul>
          {data.map((item, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <strong>Q:</strong> {item.question}<br />
              <strong>A:</strong> {item.answer}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSection07Details = (c) => {
    const data = c.data || [];
    return (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {data.map((item, i) => (
          <div key={i} style={{ width: "250px", padding: "10px", background: "#f9f9f9", border: "1px solid #ddd", borderRadius: "4px" }}>
            <strong>07박스{i + 1}</strong><br />
            <span>percentage: {item.percentage || 0}%</span><br />
            <span>label: {item.label || "(없음)"}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>📦 고객 주문 내역 + 텍스트 확인</h1>
      {orders.length === 0 ? (
        <p>현재 접수된 주문이 없습니다.</p>
      ) : (
        <table style={{ width: "100%", backgroundColor: "#fff", borderCollapse: "collapse", marginTop: "20px", tableLayout: "fixed" }}>
          <colgroup>
            <col style={{ width: "120px" }} />
            <col style={{ width: "100px" }} />
            <col style={{ width: "160px" }} />
            <col style={{ width: "120px" }} />
            <col style={{ width: "auto" }} />
          </colgroup>
          <thead>
            <tr style={{ background: "#f1f1f1" }}>
              <th style={thStyle}>주문 ID</th>
              <th style={thStyle}>고객명</th>
              <th style={thStyle}>이메일</th>
              <th style={thStyle}>컴포넌트</th>
              <th style={thStyle}>수정된 텍스트</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.user?.name}</td>
                <td style={tdStyle}>{order.user?.email}</td>
                <td style={tdStyle}>
                  <ul style={{ paddingLeft: 16 }}>
                    {order.pages?.flatMap((p) => p.components)?.map((c, i) => (
                      <li key={i}>{c.type}</li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>
                  {order.pages?.map((page, pageIndex) => (
                    <div key={pageIndex} style={{ marginBottom: "24px" }}>
                      <h3 style={{ marginBottom: "10px", color: "#222" }}>📄 페이지 {pageIndex + 1}</h3>
                      {page.components?.map((c, i) => (
                        <div key={i}>
                          {c.type === "배너04" && renderBanner04Details(c)}
                          {c.type === "섹션02" && renderSection02Details(c)}
                          {c.type === "섹션04" && renderSection04Details(c)}
                          {c.type === "섹션06" && renderSection06Details(c)}
                          {c.type === "섹션07" && renderSection07Details(c)}
                        </div>
                      ))}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  verticalAlign: "top",
  whiteSpace: "normal",
  wordBreak: "break-word",
  fontSize: "14px",
};

export default AdminPage;


