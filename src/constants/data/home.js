// home 배너 캐릭터 이미지(4)
//   ctrl + click으로 확인가능
import bannerCharImg01 from "../../assets/img/banner_ch01.png";
import bannerCharImg02 from "../../assets/img/banner_ch02.png";
import bannerCharImg03 from "../../assets/img/banner_ch03.png";
import bannerCharImg04 from "../../assets/img/banner_ch04.png";

// home 메인 라이센스 middle 이미지(6)
//   ctrl + click으로 확인가능
import mainBoxContent1 from "../../assets/img/poster_01.png";
import mainBoxContent2 from "../../assets/img/poster_02.png";
import mainBoxContent3 from "../../assets/img/poster_03.png";
import mainBoxContent4 from "../../assets/img/poster_04.png";
import mainBoxContent5 from "../../assets/img/poster_05.png";
import mainBoxContent6 from "../../assets/img/poster_06.png";

// home 메인 라이센스 small 이미지(8)
//   ctrl + click으로 확인가능
import mainBoxContent7 from "../../assets/img/link_01.png";
import mainBoxContent8 from "../../assets/img/link_02.png";
import mainBoxContent9 from "../../assets/img/link_03.png";
import mainBoxContent10 from "../../assets/img/link_04.png";
import mainBoxContent11 from "../../assets/img/link_05.png";
import mainBoxContent12 from "../../assets/img/link_06.png";
import mainBoxContent13 from "../../assets/img/link_07.png";
import mainBoxContent14 from "../../assets/img/link_08.png";

// home 새로운 소식 box 이미지(3)
//   ctrl + click으로 확인가능
import newBoxContent1 from "../../assets/img/add_01.png";
import newBoxContent2 from "../../assets/img/add_02.png";
import newBoxContent3 from "../../assets/img/add_05.png";

export const homeBanner = {
  banner_img: [
    bannerCharImg01,
    bannerCharImg02,
    bannerCharImg03,
    bannerCharImg04,
  ],
  banner_text: {
    title:"IP LICENSING\n MERCHADISING",
    subTitle:"글로벌 IP 기반의 CJ ENM 커머스 사업"
  }
}

export const homeMainLicense = {
  mainLicense_img: [
    {"img":mainBoxContent1,"alt":"스트릿우먼파이터2 포스터 이미지"},
    {"img":mainBoxContent2,"alt":"유퀴즈온더블럭 포스터 이미지"},
    {"img":mainBoxContent3,"alt":"기생충 포스터 이미지"},
    {"img":mainBoxContent4,"alt":"히어로인사이드 포스터 이미지"},
    {"img":mainBoxContent5,"alt":"명탐정코난할로윈의신부 포스터 이미지"},
    {"img":mainBoxContent6,"alt":"신비아파트 포스터 이미지"},
    {"img":mainBoxContent7,"alt":"지구오락실 포스터 이미지"},
    {"img":mainBoxContent8,"alt":"댄스가수유랑단 포스터 이미지"},
    {"img":mainBoxContent9,"alt":"보이즈플래닛 포스터 이미지"},
    {"img":mainBoxContent10,"alt":"헤어질결심 포스터 이미지"},
    {"img":mainBoxContent11,"alt":"마카앤로니2 포스터 이미지"},
    {"img":mainBoxContent12,"alt":"뿡뿡빵빵부부맨 포스터 이미지"},
    {"img":mainBoxContent13,"alt":"무한의계단 포스터 이미지"},
    {"img":mainBoxContent14,"alt":"뱀파인어소녀달자 포스터 이미지"},
  ],
  mainLicense_text:{ 
    smallBox_text:[
      "뿅뿅 지구 오락실2",
      "댄스가수 유랑단",
      "보이즈 플래닛",
      "헤어질 결심",
      "마카앤로니2",
      "뿡뿡빵빵 부부맨",
      "무한의 계단",
      "뱀파이어소녀 달자"
    ],
    hoverBox_text:{
      box1:[
        "음악",
        "2023.08.22 ~",
        "김지은",
        "권영찬",
        "울를러 +7"
      ],
      box2:[
        "예능",
        "2018.08.29 ~",
        "이기연",
        "박희연",
        "유재석, 조세호"
      ],
      box3:[
        "드라마",
        "2019.05.30",
        "봉준호",
        "봉준호, 한진원",
        "송강호 +6",
        "바른손이앤에이"
      ],
      box4:[
        "키즈",
        "2023.10.11 2023.12.31",
        "밀리언볼트"
      ],
      box5:[
        "청소년",
        "TMS (ETM)"
      ],
      box6:[
        "키즈",
        "2023.03.20 2023.06.15",
        "스튜디오 바주카"
      ]
    }
  }
}

export const homeNews = {
  news_img:[
    {"img":newBoxContent1,"alt":"코난 극장판 콜라보 상품 상세보기"},
    {"img":newBoxContent2,"alt":"소이베베 신비아파트와 협업한 제품 출시 상세보기"},
    {"img":newBoxContent3,"alt":"인기 애니메이션 신비아파트 여러 장르로 IP확장 알림 상세보기"},
  ],
  news_text: [
    "\"범인은 편의점에\" cu, 명탐정 코난 단독 제휴 상품 선보아",
    "소이베베 X 신비아파트, 마미버드 전국 매장 19곳 입점",
    "\'신비 아파트\' IP 확장...\"모든 게임사에 문 열려 있다\"",
  ],
}
  
