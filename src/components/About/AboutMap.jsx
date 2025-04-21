// import { useEffect, useRef, useState } from "react";

// const NaverMap = () => {
//   const mapRef = useRef(null);
//   const naverMap = useRef(null);
//   const scrollLockTimeout = useRef(null);
//   const [showMessage, setShowMessage] = useState(false);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID";
//     script.async = true;
//     document.head.appendChild(script);

//     script.onload = () => {
//       if (window.naver && mapRef.current) {
//         naverMap.current = new window.naver.maps.Map(mapRef.current, {
//           center: new window.naver.maps.LatLng(35.5380822, 129.3566367),
//           zoom: 16,
//           scrollWheel: false,
//         });
        
//         new window.naver.maps.Marker({
//           position: new window.naver.maps.LatLng(35.5380822, 129.3566367),
//           map: naverMap.current,
//         });        
//       }
//     };

//     const mapElement = mapRef.current;

//     const handleWheel = (e) => {
//       if (e.ctrlKey) {
//         e.preventDefault(); // ✅ 브라우저 확대 방지

//         naverMap.current?.setOptions({ scrollWheel: true });
//         setShowMessage(false);

//         if (scrollLockTimeout.current) {
//           clearTimeout(scrollLockTimeout.current);
//         }

//         scrollLockTimeout.current = setTimeout(() => {
//           naverMap.current?.setOptions({ scrollWheel: false });
//         }, 2000); // 2초 후 다시 비활성화
//       } else {
//         setShowMessage(true);
//         naverMap.current?.setOptions({ scrollWheel: false });
//       }
//     };

//     // ✅ passive: false 로 설정
//     if (mapElement) {
//       mapElement.addEventListener("wheel", handleWheel, { passive: false });
//     }

//     return () => {
//       document.head.removeChild(script);
//       if (scrollLockTimeout.current) {
//         clearTimeout(scrollLockTimeout.current);
//       }
//       if (mapElement) {
//         mapElement.removeEventListener("wheel", handleWheel);
//       }
//     };
//   }, []);

//   return (
//     <div
//       style={{ position: "relative", width: "100%", height: "400px" }}
//       onMouseEnter={() => setShowMessage(true)}
//       onMouseLeave={() => setShowMessage(false)}
//     >
//       <div
//         ref={mapRef}
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       />
//       {showMessage && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             color: "#fff",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             fontSize: "14px",
//             pointerEvents: "none",
//             zIndex: 10,
//             transition: "opacity 0.3s ease",
//           }}
//         >
//           Ctrl 키를 누른 상태에서 스크롤하면 지도를 확대/축소할 수 있습니다.
//         </div>
//       )}
//     </div>
//   );
// };

// export default NaverMap;




// ✅ NaverMap.jsx (주소 입력만 가능 / 위도·경도 직접입력 제거)
import { useEffect, useRef, useState } from "react";

const NaverMap = () => {
  const mapRef = useRef(null);
  const naverMap = useRef(null);
  const scrollLockTimeout = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.naver && mapRef.current) {
        const lat = 35.5380822;
        const lng = 129.3566367;
        naverMap.current = new window.naver.maps.Map(mapRef.current, {
          center: new window.naver.maps.LatLng(lat, lng),
          zoom: 16,
          scrollWheel: false,
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(lat, lng),
          map: naverMap.current,
        });
      }
    };

    const mapElement = mapRef.current;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        naverMap.current?.setOptions({ scrollWheel: true });
        setShowMessage(false);

        if (scrollLockTimeout.current) {
          clearTimeout(scrollLockTimeout.current);
        }

        scrollLockTimeout.current = setTimeout(() => {
          naverMap.current?.setOptions({ scrollWheel: false });
        }, 2000);
      } else {
        setShowMessage(true);
        naverMap.current?.setOptions({ scrollWheel: false });
      }
    };

    if (mapElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      document.head.removeChild(script);
      if (scrollLockTimeout.current) {
        clearTimeout(scrollLockTimeout.current);
      }
      if (mapElement) {
        mapElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleSaveAddress = () => {
    console.log("저장된 주소:", address);
    setEditing(false);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "400px" }}
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
      onClick={() => setEditing(true)}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {showMessage && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "14px",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          Ctrl 키를 누른 상태에서 스크롤하면 지도를 확대/축소할 수 있습니다.
        </div>
      )}

      {editing && (
        <div
          style={{
            position: "fixed",
            top: 150,
            left: 150,
            background: "#fff",
            border: "1px solid #ccc",
            padding: 20,
            zIndex: 9999,
            width: 300,
          }}
        >
          <button onClick={() => setEditing(false)} style={{ float: "right" }}>❌</button>
          <h3 style={{ marginBottom: 10 }}>주소 입력</h3>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="예: 서울시 강남구 XX 치킨집"
            style={{ width: "100%", marginBottom: 10 }}
          />

          <button onClick={handleSaveAddress} style={{ marginTop: 10 }}>
            저장
          </button>
        </div>
      )}
    </div>
  );
};

export default NaverMap;
