import { React } from "react";
import { Link } from "react-router-dom";
// import logoImg from "../assets/img/logo.png";

const defaultNavItems = [
  { label: "식사의 가치", link: "/about" },
  { label: "브랜드 스토리", link: "/asset" },
  { label: "고객의 신뢰", link: "/news" },
  { label: "자주 묻는 질문", link: "/contactUs" },
  { label: "새 메뉴", link: "/new" },
];

const TpHeader04 = ({ navItems, ...props }) => {
  const menus = navItems && navItems.length > 0 ? navItems : defaultNavItems;
  return (
    <header role="banner" className="tpHeader04">
      <div className="tpHeader04__container">
        <Link 
          to="/" 
          className="tpHeader04__logo" 
          tabIndex="0" 
        >
          <img 
            // src={logoImg} 
            alt="CJENM 로고 이미지" 
            aria-label="홈페이지로 이동하기" 
            // 원래 title의 값도 aria-label과 동일하게 구성하였지만 반복적인 내용으로 인해서 제외함
          />
        </Link>
        <nav className="tpHeader04__nav" role="navigation">
          <ul className="tpHeader04__nav-lists">
            {menus.map((item, idx) => (
              <li className="list" key={idx}>
                <Link 
                  to={item.link}
                  className="list-link"
                  aria-label={item.label + " 페이지로 이동"}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          to=""
          className="tpHeader04__btn"
          tabIndex="0" 
        >
          지원하기
        </Link>
      </div>
    </header>
  )
}

export default TpHeader04;