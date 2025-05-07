import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRef } from "react";
import { saveAs } from "file-saver";
import { db } from "../firebase";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 이미 있는 경우 생략 가능
import { useLocation, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { motion, AnimatePresence, hover } from "framer-motion";
import TpHeader01 from "../layout/TpHeader/TpHeader01";
import TpHeader02 from "../layout/TpHeader/TpHeader02";
import TpHeader03 from "../layout/TpHeader/TpHeader03";
import TpHeader04 from "../layout/TpHeader/TpHeader04";
import TpBanner04 from "../components/TpBanner/TpBanner04";
import TpBannerSwiper from "../components/TpBanner/TpBannerSwiper";
import TpLogoInfiniteSlider from "../components/TpSection/TpLogoInfiniteSlider";
import Tpsection04 from "../components/TpSection/TpSection04";
import Tpsection02 from "../components/TpSection/TpSection02";
import TpSectionPortfolio from "../components/TpSection/TpSectionPortfolio";
import TpProjectSlider from "../components/TpSection/TpProjectSlider";
import TpTeamStructure from "../components/TpSection/TpTeamStructure";
import TpEventGrid from "../components/TpSection/TpEventGrid";
import Tpsection07 from "../components/TpSection/TpSection07";
import TpSection06 from "../components/TpSection/TpSection06";
import TpHeaderUser from "../layout/TpHeader/TpHeaderUser";

// ✅ Shopify API 정보 추가
const SHOPIFY_DOMAIN = "rejg0h-j1.myshopify.com"; // 👉 본인 거 입력
const STOREFRONT_ACCESS_TOKEN = "daa886fc29a2cec8d02aadc28ce245da"; // 👉 본인 거 입력

const componentMap = {
  헤더01: TpHeader01,
  헤더02: TpHeader02,
  헤더03: TpHeader03,
  헤더04: TpHeader04,
  배너04: TpBanner04,
  배너Swiper: TpBannerSwiper,
  배너로고슬라이드: TpLogoInfiniteSlider,
  섹션02: Tpsection02,
  섹션04: Tpsection04,
  섹션06: TpSection06,
  섹션07: Tpsection07,
  섹션포트폴리오: TpSectionPortfolio,
  프로젝트슬라이드: TpProjectSlider,
  팀구성: TpTeamStructure,
  행사그리드: TpEventGrid,
};

const ComponentItem = ({ type, label, previewImage, previewVideo }) => {
  const [, dragRef] = useDrag(() => ({ type: "COMPONENT", item: { type } }));
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={dragRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "350px",
        background: "#fff",
        padding: "15px 10px 40px 10px",
        marginBottom: "10px",
        cursor: "grab",
        borderBottom: "1px solid #ccc",
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        {label}
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {previewImage && (
          <img
            src={previewImage}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease-in-out",
              transform: "scale(1)", // 더 이상 확대 X
            }}
          />
        )}

        {previewVideo && (
          <video
            src={previewVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease-in-out",
              transform: "scale(1)", // 더 이상 확대 X
            }}
          />
        )}

        {/* 오버레이 및 문구 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: hovered ? "rgba(0,0,0,0.6)" : "transparent",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: "500",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease, background-color 0.5s ease",
            pointerEvents: "none", // 클릭 방지
          }}
        >
          필요한 요소를 드래그해서 추가하세요!      
        </div>
      </div>
    </div>
  );
};




// ✅ 상단 탭 메뉴
const SlideMenu = ({ activeTab, setActiveTab, tabItems }) => {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* 탭 버튼 */}
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
            onClick={() => setActiveTab(tab)}
            style={{
              margin: "0 12px",
              background: activeTab === tab ? "#000" : "transparent",
              color: activeTab === tab ? "#fff" : "#000",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
              fontWeight: "bold",
              borderRadius: 8,
              transition: "all 0.3s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 컴포넌트 목록 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            height: "550px",
            overflowY: "auto",
            padding: 20,
            background: "#f9f9f9",
          }}
        >
          {tabItems[activeTab].map((item) => (
            <ComponentItem
              key={item.type}
              type={item.type}
              label={item.label}
              previewImage={item.previewImage}
              previewVideo={item.previewVideo}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};



const DropCanvas = ({
  canvasWidth, // ✅ 여기 추가
  components,
  onDrop,
  onDelete,
  onEdit,
  onBoxEdit,
  onUpdate,
  pages,
  orderId,
  menuItems,
  setMenuItems,
  removingIndex // ✅ props로 받기
}) => {
  const DropZone = ({ index }) => {
    const [{ isOver }, dropRef] = useDrop(() => ({



      
      accept: "COMPONENT",
      drop: (item) => onDrop(item, index),
      collect: (monitor) => ({ isOver: monitor.isOver() }),
    }));

    return (
      <>
        {/* <p 
          style={{
            color:"#fff",
            fontSize:"40px",
            fontWeight:"600",
            textAlign:"center",
            marginBottom:"60px",
            marginTop:"100px"
        }}>
          + 원하는 컴포넌트를 하단에 추가하세요!
        </p> */}
        <div
          ref={dropRef}
          style={{
            height: 50,
            border: "2px dashed #fff",
            borderRadius: "10px",
            margin: "10px 0",
            background: isOver ? "#444" : "transparent",
          }}
        />
      </>  
    );
  };

  return (
    <>
      <h3
        style={{
          marginTop:350,
          color:"#fff",
          fontSize:"40px",
          textAlign:"center",
          marginBottom:"60px"
        }}
      >
        원하는 컴포넌트를 하단에 넣어주세요 ↓
      </h3>
      {/* 외부 컨테이너: 중앙 정렬 + 배경 */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "#222",
          minHeight: 400,
          paddingBottom: 200,
          zIndex: 1,
          transition: "all 0.4s ease"
        }}
      >
        {/* 내부 너비 조절 컨테이너 */}
        <div
          style={{
            width: canvasWidth, // props로 받은 값
            padding: "0 20px",
            transition: "width 0.4s ease"
          }}
        >
          {/* 헤더를 제외한 컴포넌트만 렌더링 */}
          {components
            .filter((comp) => !comp.type.startsWith("헤더"))
            .map((comp, i) => {
              const Comp = componentMap[comp.type];
              return (
                <React.Fragment key={comp.id ?? i}>
                  <DropZone index={i} />
                  <AnimatePresence>
                    {removingIndex !== i && (
                      <motion.div
                        key={comp.id ?? i}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 0.7,
                          y: 40,
                          filter: "blur(6px)",
                          transition: { duration: 0.5, ease: "easeInOut" }
                        }}
                        style={{
                          border: "2px dashed white",
                          borderRadius: "10px",
                          marginBottom: 20,
                          position: "relative",
                        }}
                      >
                        <Comp
                          {...comp}
                          pages={pages}
                          orderId={orderId}
                          onEdit={(newData) => onEdit(i, newData)}
                          onBoxEdit={(updatedData) => onBoxEdit(i, updatedData)}
                          onUpdate={(updatedData) => onUpdate(i, updatedData)}
                          {...(comp.type === "헤더02"
                            ? { menuItems, setMenuItems }
                            : {})}
                        />
                        <button
                          onClick={() => onDelete(i)}
                          style={{
                            zIndex:"1000",
                            position: "absolute",
                            top: 20,
                            right: 20,
                            fontSize: "20px",
                            fontWeight: "500",
                            background: "#f33",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            padding: "12px 22px",
                            cursor: "pointer",
                          }}
                        >
                          제거하기
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}

          <DropZone index={components.length} />
        </div>
      </div>

    </>
  );
};


const defaultMenus = [
  { id: 1, label: "식사의 가치", link: "/preview?page=0" },
  { id: 2, label: "브랜드 스토리", link: "/preview?page=1" },
  { id: 3, label: "고객의 신뢰", link: "/preview?page=2" },
  { id: 4, label: "자주 묻는 질문", link: "/preview?page=3" },
];

function TpPage03() {
  const [canvasWidth, setCanvasWidth] = useState("100%"); // 초기값은 PC용
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "0", 10);
  const [orderId, setOrderId] = useState(null); // 🔥 추가

  const [pages, setPages] = useState([{ id: Date.now(), components: [], menuItems: defaultMenus }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("상단메뉴");
  const [removingIndex, setRemovingIndex] = useState(null); // ✅ 이거 추가해줘!
  const navigate = useNavigate(); // TpPage03 안에서 선언
  // 🔥 Firestore에서 저장된 컴포넌트 가져오기
  const [savedSites, setSavedSites] = useState([]); // 🔥 저장된 사이트 리스트
  const [showModal, setShowModal] = useState(false); // 🔥 모달 열기/닫기
  const [showMenu, setShowMenu] = useState(false);
  const [headerType, setHeaderType] = useState("헤더02");
  const [showRightPanel, setShowRightPanel] = useState(false); // 👉 추가
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      // ⚠️ 강제 리플로우: layout 강제로 다시 계산
      canvasRef.current.getBoundingClientRect();
  
      // ScrollTrigger 등 레이아웃 관련 처리 새로고침
      ScrollTrigger.refresh();
    }
  }, [canvasWidth]);
  
  // Firestore 초기화 확인
  useEffect(() => {
    if (!db) {
      console.error("Firestore가 초기화되지 않았습니다.");
      return;
    }
  }, []);

  const fetchSavedSites = async () => {
    if (!db) {
      alert("Firestore가 초기화되지 않았습니다.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const sites = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSavedSites(sites);
      setShowModal(true);
    } catch (error) {
      console.error("🔥 사이트 목록 불러오기 실패:", error);
      alert("사이트 목록을 불러오는데 실패했습니다.");
    }
  };

  const handleDeleteSite = async (id) => {
    if (!db) {
      alert("Firestore가 초기화되지 않았습니다.");
      return;
    }

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "orders", id));
      alert("삭제되었습니다!");
      setSavedSites((prevSites) => prevSites.filter((site) => site.id !== id));
    } catch (error) {
      console.error("🔥 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSelectSite = (siteData) => {
    // pages의 각 요소에 menuItems가 없으면 defaultMenus로 보완
    const fixedPages = (siteData.pages || []).map(page => ({
      ...page,
      menuItems: page.menuItems || defaultMenus
    }));
    setPages(fixedPages);
    setOrderId(siteData.id);
    setHeaderType(siteData.headerType || "헤더02"); // 헤더 타입 복원
    setShowModal(false);
    navigate("/preview", { state: { pages: fixedPages, headerType: siteData.headerType || "헤더02" } });
  };
  
  
  // 🔥 사이트 전체 삭제 함수
const handleDeleteAllSites = async () => {
  const confirmDelete = window.confirm("정말 모든 사이트를 삭제하시겠습니까?");
  if (!confirmDelete) return;

  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const batchDelete = querySnapshot.docs.map((docItem) =>
      deleteDoc(doc(db, "orders", docItem.id))
    );

    await Promise.all(batchDelete); // 모두 삭제 완료 기다리기
    alert("전체 삭제되었습니다!");

    setSavedSites([]); // 화면에서도 전부 지워주기
  } catch (error) {
    console.error("🔥 전체 삭제 실패:", error);
    alert("전체 삭제 중 오류가 발생했습니다.");
  }
};

  const fetchSavedComponents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
        const data = lastDoc.data();

        console.log("✅ 저장된 데이터 불러오기 성공:", data.components);
        return data.components || [];
      } else {
        console.log("❗ 저장된 데이터 없음");
        return [];
      }
    } catch (error) {
      console.error("🔥 Firestore 데이터 가져오기 실패:", error);
      return [];
    }
  };
  // 🔥 저장된 사이트 불러오기
  const handleLoadSavedSite = async () => {
    const savedComponents = await fetchSavedComponents();
    // savedComponents가 pages 구조라면 보정
    const fixedPages = (savedComponents || []).map(page => ({
      ...page,
      menuItems: page.menuItems || defaultMenus
    }));
    if (fixedPages.length > 0) {
      navigate("/preview", { state: { pages: fixedPages } });
    } else {
      alert("❗ 저장된 사이트 데이터가 없습니다.");
    }
  };

  useEffect(() => {
    const incomingOrderId = location.state?.orderId;
    if (incomingOrderId) {
      setOrderId(incomingOrderId);
    }
  }, [location.state]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageIndex = parseInt(params.get("page"), 10);
    if (!isNaN(pageIndex)) {
      setCurrentPage(pageIndex);
    }
  }, [location]);
  // ✅ Shopify 상품 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
        console.warn("Shopify API 정보가 설정되지 않았습니다.");
        return;
      }

      const endpoint = `https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`;
      const query = `{
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const fetchedProducts = result.data.products.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          description: edge.node.description,
          imageUrl: edge.node.images.edges[0]?.node.url || "",
          price: edge.node.variants.edges[0]?.node.price.amount || null,
        }));

        setProducts(fetchedProducts);
        window.shopifyProducts = fetchedProducts;
      } catch (error) {
        console.error("🔥 Shopify 상품 가져오기 실패:", error);
        // 에러 발생 시 빈 배열로 초기화
        setProducts([]);
      }
    };
    
    fetchProducts();
  }, []);

  // 1. pages가 바뀔 때마다 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem("tp_pages", JSON.stringify(pages));
  }, [pages]);

  // 2. 페이지가 처음 마운트될 때 sessionStorage에서 불러오기
  useEffect(() => {
    const saved = sessionStorage.getItem("tp_pages");
    if (saved) {
      setPages(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    // 페이지나 헤더 타입이 바뀔 때마다 ScrollTrigger 새로고침
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // DOM이 안정화되고 나서 실행
  }, [pages, headerType]);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }, [canvasWidth]);
  
  // ✅ 여기서부터는 기존 TpPage03 코드 그대로 작성하면 됩니다
  
  const tabItems = {
    상단메뉴: [
      { type: "헤더01", label: "헤더 01", previewImage: "/preview/header01.jpg" },
      { type: "헤더02", label: "헤더 02", previewImage: "/preview/header02.jpg" },
      { type: "헤더03", label: "헤더 03", previewImage: "/preview/header03.jpg" },
      { type: "헤더04", label: "헤더 04", previewImage: "/preview/header04.jpg" },
    ],
    메인배너: [
      { type: "배너04", label: "배너04", previewImage: "/images/배너04이미지.png" },
      // { type: "헤더01", label: "헤더 01", previewImage: "/preview/header01.jpg" },
      // { type: "헤더02", label: "헤더 02", previewImage: "/preview/header02.jpg" },
      // { type: "헤더03", label: "헤더 03", previewImage: "/preview/header03.jpg" },
      // { type: "헤더04", label: "헤더 04", previewImage: "/preview/header04.jpg" },
      { type: "배너Swiper", label: "배너 스와이퍼", previewImage: "/images/add_01.png" },
    ],
    콘텐츠영역: [
      { type: "섹션02", label: "섹션02", previewImage: "/images/섹션02이미지.png" },
      { type: "섹션04", label: "섹션04", previewVideo: "/preview/section04.mp4" },
      { type: "섹션06", label: "섹션06", previewImage: "/images/섹션06이미지.png" },
      { type: "섹션07", label: "섹션07", previewImage: "/preview/section07.jpg" },
      // ...
    ]
  };
  
  const handleDrop = (item, index) => {
    if (["헤더01", "헤더02", "헤더03", "헤더04"].includes(item.type)) {
      setHeaderType(item.type);
      return;
    }
    const newItem = { ...item, id: Date.now() + Math.random() };
    if (item.type === "헤더02") {
      newItem.user = null; // 기본값
    }
    // 🔧 타입에 따라 기본 데이터 설정
    else if (item.type === "배너로고슬라이드") {
      newItem.logos = [
        { id: 1, imageUrl: "https://via.placeholder.com/120x60?text=Logo1" },
        { id: 2, imageUrl: "https://via.placeholder.com/120x60?text=Logo2" },
      ];
    } else if (item.type === "배너Swiper") {
      newItem.slides = [
        { title: "슬라이드 1", subTitle: "서브1", imageUrl: "", align: "center" },
        { title: "슬라이드 2", subTitle: "서브2", imageUrl: "", align: "center" },
      ];
    } else if (item.type === "팀구성") {
      newItem.data = [
        {
          number: "①",
          title: "Project Manager",
          items: [
            { en: "Project Planning", ko: "프로젝트 일정관리", detail: "전체 일정 조율 및 계획 수립" },
            { en: "Contents Organization", ko: "콘텐츠 정리", detail: "콘텐츠 항목 분류 및 구조화" },
          ],
        },
      ];
    } else if (item.type === "섹션포트폴리오") {
      newItem.data = [
        {
          id: 1,
          mediaType: "image",
          mediaUrl: "https://via.placeholder.com/300x400?text=Sample1",
          brand: "boribori",
          description: "app renewal ux design",
        },
      ];
    } else if (item.type === "프로젝트슬라이드") {
      newItem.data = [];
    } else if (item.type === "행사그리드") {
      newItem.data = [
        {
          id: Date.now() + 1,
          type: "Exhibition",
          title: "The Seoul Illustration Fair 2023",
          date: "2023.05.16 - 05.20",
          thumbnail: "",
        },
      ];
    } else if (item.type === "섹션04") {
      newItem.boxes = [
        {
          title: "통밀 바게트",
          subtitle: "건강한 시작을 위한 통밀의 고소함",
          description: "식사빵으로도 어울리는 담백한 통밀 바게트...",
          imageClass: "",
        },
      ];
      newItem.titleText = "기본 제목";
      newItem.subTitleText = "기본 서브제목";
      newItem.align = "center";
    } else if (item.type === "섹션02") {
      newItem.text = "기본 텍스트";
      newItem.img = "";
    } else if (item.type === "섹션07") {
      newItem.data = [
        { percentage: 88, label: "고객 만족도" },
        { percentage: 75, label: "서비스 도입률" },
        { percentage: 63, label: "재구매율" },
      ];
    } else if (item.type === "섹션06") {
      newItem.data = [
        {
          question: "Q. 어떤 기준으로 빵을 만드나요?",
          answer: "A. 건강한 재료와 정직한 공정을 가장 중요하게 생각합니다.",
        },
      ];
      newItem.titleText = "자주 묻는 질문들";
      newItem.subTitleText = "자주 들어오는 질문과 답변을 모았습니다.";
      newItem.align = "center";
    }
  
    if (item.type === "헤더02") {
      // 모든 페이지에 header02가 없으면 추가
      setPages((prevPages) => prevPages.map(page => {
        const hasHeader = page.components.some(c => c.type === "헤더02");
        if (!hasHeader) {
          const newComponents = [...page.components];
          newComponents.splice(index, 0, newItem);
          return { ...page, components: newComponents };
        }
        return page;
      }));
    } else {
      setPages((prevPages) => {
        const updatedPages = [...prevPages];
        const targetComponents = [...(updatedPages[currentPage]?.components || [])];
        targetComponents.splice(index, 0, newItem);
        updatedPages[currentPage] = {
          ...updatedPages[currentPage],
          components: targetComponents,
        };
        return updatedPages;
      });
    }
  };
  

  const handleEdit = (index, newData) => {
    setPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = {
        ...updatedPages[currentPage],
        components: updatedPages[currentPage].components.map((c, i) =>
          i === index ? { ...c, ...newData } : c
        ),
      };
      return updatedPages;
    });
  };

  const handleBoxEdit = (index, updatedData) => {
    setPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage] = {
        ...updatedPages[currentPage],
        components: updatedPages[currentPage].components.map((c, i) =>
          i === index ? { ...c, ...updatedData } : c
        ),
      };
      return updatedPages;
    });
  };

const handleUpdate = (index, updatedData) => {
  setPages((prevPages) => {
    const updatedPages = [...prevPages];
    updatedPages[currentPage] = {
      ...updatedPages[currentPage],
      components: updatedPages[currentPage].components.map((c, i) =>
        i === index ? { ...c, ...updatedData } : c
      ),
    };
    return updatedPages;
  });
};


const handleDelete = (index) => {
  setRemovingIndex(index); // 삭제 중 표시

  setTimeout(() => {
    setPages((prevPages) => {
      const updatedPages = [...prevPages];
      const newComponents = [...updatedPages[currentPage].components];
      newComponents.splice(index, 1); // 0.5초 후 진짜 삭제
      updatedPages[currentPage] = {
        ...updatedPages[currentPage],
        components: newComponents,
      };
      return updatedPages;
    });
    setRemovingIndex(null); // 삭제 끝났으니 초기화
  }, 500); // 애니메이션 보여줄 시간
};


  const removeUndefined = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(removeUndefined);
    } else if (typeof obj === "object" && obj !== null) {
      const cleaned = {};
      for (let key in obj) {
        if (obj[key] !== undefined) {
          cleaned[key] = removeUndefined(obj[key]);
        }
      }
      return cleaned;
    }
    return obj;
  };
    const clearSavedComponents = () => {
      localStorage.removeItem("savedComponents");
    };
  
    const handleSubmitOrder = async () => {
      if (!db) {
        alert("Firestore가 초기화되지 않았습니다.");
        return;
      }

      if (!email || !name) {
        alert("이름과 이메일을 입력해주세요.");
        return;
      }

      try {
        const docRef = await addDoc(collection(db, "orders"), {
          user: { name, email },
          pages,
          headerType, // 헤더 타입도 함께 저장
          createdAt: serverTimestamp(),
        });
        setOrderId(docRef.id);
        clearSavedComponents();
        alert("주문이 저장되었습니다!");
      } catch (err) {
        console.error("🔥 Firestore 저장 오류:", err);
        alert("저장 실패: " + err.message);
      }
    };

  const handleBuild = () => {
    const htmlBody = pages.map((page, pageIndex) => {
      const pageTitle = `<h2 class="page-title">📄 페이지 ${pageIndex + 1}</h2>`;
      const comps = page.components.map((c) => {
        if (c.type === "배너04") {
          return `
            <section class="tpBanner04">
              ${
                c.mediaType === "video"
                  ? `<video class="tpBanner04__background" autoplay loop muted playsinline><source src="${c.mediaUrl}" type="video/mp4"></video>`
                  : `<div class="tpBanner04__background" style="background-image:url('${c.mediaUrl}')"></div>`
              }
              <div class="tpBanner04__text" style="text-align:${c.align}">
                <h2>${c.title}</h2>
                <p>${c.subTitle}</p>
                <button class="btn">${c.buttonText || "지금 문의하기"}</button>
              </div>
            </section>
          `;
        }
    
        if (c.type === "섹션04") {
          return `
            <section>
              <h2 style="text-align:${c.align}">${c.titleText || ""}</h2>
              <p style="text-align:${c.align}">${c.subTitleText || ""}</p>
              <div class="section04-box">
                ${(c.boxes || []).map((box) => `
                  <div class="item">
                    <div class="item-image" style="background-image:url('${box.imageClass || ""}')"></div>
                    <h3>${box.title}</h3>
                    <p>${box.subtitle}</p>
                    <p>${box.description}</p>
                  </div>
                `).join("")}
              </div>
            </section>
          `;
        }
    
        if (c.type === "섹션07") {
          return `
            <section>
              <h2 style="text-align:${c.align || 'center'}">${c.titleText || ""}</h2>
              <p style="text-align:${c.align || 'center'}">${c.subTitleText || ""}</p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                ${(c.data || []).map((item, i) => `
                  <div style="border: 1px solid #ccc; padding: 12px; width: 200px;">
                    <strong>${item.label || "항목"}</strong>
                    <div>${item.percentage || 0}%</div>
                  </div>
                `).join("")}
              </div>
            </section>
          `;
        }
    
        if (c.type === "섹션06") {
          return `
            <section>
              <h2 style="text-align:${c.align || 'center'}">${c.titleText || ""}</h2>
              <p style="text-align:${c.align || 'center'}">${c.subTitleText || ""}</p>
              <ul>
                ${(c.data || []).map((qa) => `
                  <li><strong>Q.</strong> ${qa.question}<br/><strong>A.</strong> ${qa.answer}</li>
                `).join("")}
              </ul>
            </section>
          `;
        }
    
        if (c.type === "섹션02") {
          return `
            <section>
              <p style="text-align:${c.align || 'center'}">${c.text || ""}</p>
            </section>
          `;
        }
    
        // 그 외 텍스트 중심 섹션
        return `
          <section>
            <h2 style="text-align:${c.align || 'center'}">${c.titleText || c.title || ""}</h2>
            <p style="text-align:${c.align || 'center'}">${c.subTitleText || c.subTitle || c.text || ""}</p>
          </section>
        `;
      }).join("");
    
      return pageTitle + comps;
    }).join("\n");
    const html = `<!DOCTYPE html><html><head><meta charset='UTF-8'><title>템플릿</title></head><body>${htmlBody}</body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, "template.html");
  };

// ✅ TpBanner04.jsx 포함 / 미리보기 페이지를 실제 렌더링 형태로 구성
const handlePreview = () => {
  const previewWindow = window.open("", "_blank", "width=1200,height=800");

  const style = `
    <style>
      body { margin: 0; font-family: 'Pretendard', sans-serif; background: #fff; color: #333; }
      section { padding: 60px; border-bottom: 1px solid #eee; }
      h2.page-title { padding: 20px; background: #f7f7f7; margin: 0; text-align: center; }
      .tpBanner04 { position: relative; width: 100%; height: 100vh; overflow: hidden; color: white; }
      .tpBanner04__background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(80%); z-index: 1; }
      .tpBanner04__text { position: relative; z-index: 2; top: 50%; transform: translateY(-50%); text-align: center; }
      .tpBanner04__text h2 { font-size: 60px; margin-bottom: 16px; }
      .tpBanner04__text p { font-size: 22px; margin-bottom: 30px; }
      .tpBanner04__text .btn { border-radius: 100px; border: none; padding: 14px 30px; font-size: 18px; font-weight: bold; background-color: rgba(0, 0, 0, 0.4); color: white; }
      .section04-box { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
      .section04-box .item { width: 300px; border: 1px solid #ccc; padding: 16px; }
      .section04-box .item-image { width: 100%; height: 180px; background-size: cover; background-position: center; margin-bottom: 12px; }
    </style>
  `;

  const body = pages.map((page, pageIndex) => {
    const pageTitle = `<h2 class="page-title">📄 페이지 ${pageIndex + 1}</h2>`;
    const comps = page.components.map((c) => {
      if (c.type === "배너04") {
        return `
          <section class="tpBanner04">
            ${
              c.mediaType === "video"
                ? `<video class="tpBanner04__background" autoplay loop muted playsinline><source src="${c.mediaUrl}" type="video/mp4"></video>`
                : `<div class="tpBanner04__background" style="background-image:url('${c.mediaUrl}')"></div>`
            }
            <div class="tpBanner04__text" style="text-align:${c.align}">
              <h2>${c.title}</h2>
              <p>${c.subTitle}</p>
              <button class="btn">${c.buttonText || "지금 문의하기"}</button>
            </div>
          </section>
        `;
      }
  
      if (c.type === "섹션04") {
        return `
          <section>
            <h2 style="text-align:${c.align}">${c.titleText || ""}</h2>
            <p style="text-align:${c.align}">${c.subTitleText || ""}</p>
            <div class="section04-box">
              ${(c.boxes || []).map((box) => `
                <div class="item">
                  <div class="item-image" style="background-image:url('${box.imageClass || ""}')"></div>
                  <h3>${box.title}</h3>
                  <p>${box.subtitle}</p>
                  <p>${box.description}</p>
                </div>
              `).join("")}
            </div>
          </section>
        `;
      }
  
      if (c.type === "섹션07") {
        return `
          <section>
            <h2 style="text-align:${c.align || 'center'}">${c.titleText || ""}</h2>
            <p style="text-align:${c.align || 'center'}">${c.subTitleText || ""}</p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
              ${(c.data || []).map((item, i) => `
                <div style="border: 1px solid #ccc; padding: 12px; width: 200px;">
                  <strong>${item.label || "항목"}</strong>
                  <div>${item.percentage || 0}%</div>
                </div>
              `).join("")}
            </div>
          </section>
        `;
      }
  
      if (c.type === "섹션06") {
        return `
          <section>
            <h2 style="text-align:${c.align || 'center'}">${c.titleText || ""}</h2>
            <p style="text-align:${c.align || 'center'}">${c.subTitleText || ""}</p>
            <ul>
              ${(c.data || []).map((qa) => `
                <li><strong>Q.</strong> ${qa.question}<br/><strong>A.</strong> ${qa.answer}</li>
              `).join("")}
            </ul>
          </section>
        `;
      }
  
      if (c.type === "섹션02") {
        return `
          <section>
            <p style="text-align:${c.align || 'center'}">${c.text || ""}</p>
          </section>
        `;
      }
  
      // 그 외 텍스트 중심 섹션
      return `
        <section>
          <h2 style="text-align:${c.align || 'center'}">${c.titleText || c.title || ""}</h2>
          <p style="text-align:${c.align || 'center'}">${c.subTitleText || c.subTitle || c.text || ""}</p>
        </section>
      `;
    }).join("");
  
    return pageTitle + comps;
  }).join("");
  

  previewWindow.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">${style}</head><body>${body}</body></html>`);
  previewWindow.document.close();
};






  // ... (handleDrop, handleEdit, handleBoxEdit, handleDelete, handleSubmitOrder, handleBuild, handlePreview)

  return (
    <DndProvider backend={HTML5Backend}>
      <TpHeaderUser headerType={headerType}
        user={null}
        pages={pages}
        menuItems={pages[currentPage]?.menuItems || defaultMenus}
        setMenuItems={(newMenus) => {
          setPages(prev => prev.map((p, idx) => idx === currentPage ? { ...p, menuItems: newMenus } : p));
        }}
        isPreview={false}
        orderId={orderId}
      />
      <div style={{ paddingTop: 20, background: "#222", minHeight: "100vh" }}>
        {/* 컴포넌트 메뉴 열기 버튼 - 하단 우측 고정 */}
        <div style={{ position: "fixed", bottom: 40, left: 40, zIndex: 2000 }}>
        <button
          onClick={() => setShowMenu(prev => !prev)}
          style={{
            padding: "14px 24px",
            borderRadius: "8px",
            background: showMenu ? "#e91e63" : "#3182f6", // ✅ 상태에 따라 배경색 변경
            color: "#fff",
            border: "none",
            fontWeight: "400",
            fontSize: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            cursor: "pointer",
            transition: "background 0.3s ease" // ✅ 부드러운 전환 효과
          }}
        >
          {showMenu ? "컴포넌트 메뉴 닫기" : "컴포넌트 메뉴 열기"}
        </button>

        {/* 왼쪽 하단 고정 홈 버튼 */}
        <div style={{
          position: "fixed",
          bottom: 70,
          left: "50%",
          transform: "translate(-50%)",
          zIndex: 99999
        }}>
          <button
            onClick={() => navigate("/")}
            style={{
              width: "160px",
              padding: "10px 24px",
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              cursor: "pointer"
            }}
          >
            홈으로 가기
          </button>
        </div>
        <div style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "12px",
          zIndex: 9999
        }}>
          {[
            { label: "PC", width: "100%" },
            { label: "태블릿", width: "800px" },
            { label: "모바일", width: "420px" },
          ].map(({ label, width }) => (
            <button
              key={label}
              onClick={() => setCanvasWidth(width)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                background: "#000",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowRightPanel(prev => !prev)}
          style={{
            padding: "14px 24px",
            position: "fixed",
            bottom: 40,
            right: 40,
            fontSize: "18px",
            fontWeight: "400",
            zIndex: 99999,
            borderRadius: "8px",
            backgroundColor: showRightPanel ? "#e91e63" : "#3182f6",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease" // ✅ 부드러운 전환 효과
          }}
        >
          {showRightPanel ? "패널 닫기" : "패널 열기"}
        </button>

        </div>
        {/* 컴포넌트 메뉴(슬라이드/사이드바) */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 200,
                left: 40,
                width: activeTab === "상단메뉴" ? 900 : 700,                 
                maxHeight: "90vh",
                overflowY: "auto",
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,1)",
                zIndex: 2100,
                padding: "0px",
                transformOrigin: "bottom right",
                transition: "width 0.3s ease"
              }}
            >
              <SlideMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabItems={tabItems}
              />
            </motion.div>
          )}
        </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={canvasWidth} // 또는 상태가 바뀔 때 trigger 역할
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            width: `${canvasWidth}`,
            margin: "0 auto",
            transition: "width 0.4s ease", // ✅ 추가
          }}
        >
        <figure
          key={canvasWidth} // ✅ canvasWidth가 바뀌면 figure를 강제 리렌더링
          ref={canvasRef}
 
        >
          <DropCanvas
            canvasWidth={canvasWidth}
            pages={pages}
            components={pages[currentPage]?.components || []}
            onDrop={handleDrop}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onBoxEdit={handleBoxEdit}
            onUpdate={handleUpdate}
            orderId={orderId}
            removingIndex={removingIndex} // ✅ 여기!
            menuItems={pages[currentPage]?.menuItems || defaultMenus}
            setMenuItems={(newMenus) => {
              setPages(prev => prev.map((p, idx) => idx === currentPage ? { ...p, menuItems: newMenus } : p));
            }}
          />
        </figure>
        {showModal && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}>
            {/* 우측 상단 고정 버튼 */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "fixed",
                top: 30,
                right: 30,
                zIndex: 20000,
                padding: "12px 28px",
                borderRadius: "12px",
                background: "#111",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                outline: "2px solid #fff",
                pointerEvents: "auto"
              }}
            >
              제작페이지로 돌아가기
            </button>
            <div style={{
              background: "white",
              padding: 30,
              borderRadius: 10,
              width: "500px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}>
              <h2>🔎 사이트 불러오기</h2>
              <button
                onClick={handleDeleteAllSites}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  background: "#f33",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                🗑 전체 삭제
              </button>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {savedSites.map((site) => (
                  <li key={site.id} style={{
                    padding: "12px 0",
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div>
                      <strong>{site.user?.name || "이름없음"}</strong>  
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {site.user?.email || "이메일없음"}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      {/* 선택 버튼 */}
                      <button
                        onClick={() => handleSelectSite(site)}
                        style={{
                          padding: "8px 12px",
                          border: "none",
                          borderRadius: "6px",
                          background: "black",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        선택
                      </button>

                      {/* 삭제 버튼 추가 */}
                      <button
                        onClick={() => handleDeleteSite(site.id)}
                        style={{
                          padding: "8px 12px",
                          border: "none",
                          borderRadius: "6px",
                          background: "#f33",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#eee",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  닫기
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    background: "#222",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  제작페이지로 돌아가기
                </button>
              </div>
            </div>
          </div>
        )}
  </motion.div>
  </AnimatePresence>       {/* 상단 컨트롤 UI 복구 */}

<AnimatePresence>
  {showRightPanel && (
    <motion.div
      key="right-panel"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 50, opacity: 0 }}
      transition={{ duration: 0.3}}
      style={{
        position: "fixed",
        top: 200,
        right: 40,
        width: 320,
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        zIndex: 99998,
        boxSizing: "border-box"
      }}
    >
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" style={{marginBottom:"10px", width: "100%", height: "50px", padding: "10px", borderRadius: "10px", border: "none", outline: "none" }} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" style={{marginBottom:"10px", width: "100%", height: "50px", padding: "10px", borderRadius: "10px", border: "none", outline: "none" }} />
      <button onClick={handleSubmitOrder} style={{ borderRadius: "10px", padding: "10px" }}>Firestore 저장</button>
      <button onClick={fetchSavedSites} style={{ borderRadius: "10px", padding: "10px" }}>사이트 불러오기</button>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {pages.map((_, index) => (
          <div key={index} style={{ display: "inline-block", margin: "0 4px", position: "relative" }}>
            <button
              onClick={() => setCurrentPage(index)}
              style={{
                padding: "8px 16px",
                backgroundColor: index === currentPage ? "#000" : "#ccc",
                color: index === currentPage ? "#fff" : "#000",
                border: "none",
                borderRadius: 4,
              }}
            >
              페이지 {index + 1}
            </button>
            {pages.length > 1 && (
              <button
                onClick={() => {
                  const newPages = pages.filter((_, i) => i !== index);
                  setPages(newPages);
                  if (currentPage >= newPages.length) {
                    setCurrentPage(newPages.length - 1);
                  }
                }}
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  background: "#f33",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  fontSize: 12,
                  lineHeight: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => {
            const headerComp = pages.find(page => page.components.some(c => c.type === "헤더02"))?.components.find(c => c.type === "헤더02");
            setPages([
              ...pages,
              {
                id: Date.now(),
                components: headerComp ? [ { ...headerComp, id: Date.now() + Math.random() } ] : [],
                menuItems: defaultMenus
              }
            ]);
            setCurrentPage(pages.length);
          }}
          style={{
            padding: "8px 16px",
            marginLeft: 8,
            border: "1px dashed #888",
            borderRadius: 4,
            backgroundColor: "#eee",
          }}
        >
          + 페이지 추가
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </div>
    </DndProvider>
  );
}

export default TpPage03;