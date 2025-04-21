import React, { useEffect,useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function StickySection() {
    const sectionRef = useRef();
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".aniText", {
              x: -100,
              opacity: 0,
              duration: 0.5,
              delay: 0.2,  
              ease: "power2.out",
              stagger: 0.3,
              scrollTrigger: {
                trigger: ".aniText",
                start: "top 95%",
                toggleActions: "play none none reverse"
              }
            });
            gsap.utils.toArray(".stickySubText__text").forEach((elem) => {
              gsap.from(elem, {
                y: 100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: elem,
                  start: "top 60%",
                  toggleActions: "play none none reverse"
                }
              });
            });
            

        }, sectionRef)
        return () => ctx.revert(); 
    },[])

  return (
    <section 
      className="tpSection01"
      ref={sectionRef}
    >
      <div
        style={{
        }}
        className="tpSection01__stickyText"
      >
        <h2
          className="stickyText__title aniText"
        >
          처음 접하는 분들의<br/>
          평가를 알아보아요!
        </h2>
        <h3
          className="stickyText__subTitle aniText"
        >
          빠르게 먹고 끝내는 식사는<br/>진정한 식사라고 볼 수 없습니다.
        </h3>
      </div>
      <div className="tpSection01__stickySubText">
        <h2
            className="stickySubText__text"
        >
          처음엔 건강식품이라고 해서 거부감이 있었는데, 
          막상 먹어보니 생각보다 맛도 깔끔하고 목 넘김도 부드러워서 놀랐어요. 
          무엇보다 성분이 하나하나 투명하게 공개되어 있어서 신뢰가 갔고, 
          하루 권장량이 정확히 나와 있어서 복용 관리하기에도 편했어요. 
          이전에는 비슷한 제품을 먹고 속이 불편한 적이 있었는데, 
          이 제품은 오히려 속이 편안해졌고 피부도 전보다 맑아진 느낌이에요.
        </h2>
        <h2
          className="stickySubText__text"
        >
          배송도 빠르고 포장도 꼼꼼하게 되어 있어서 받았을 때 기분이 좋았고, 
          문의했을 때 고객센터도 너무 친절하게 대응해주셔서 감동이었습니다. 
          무엇보다 좋은 건 정기적으로 챙겨먹게 되니까 루틴도 잡히고, 
          덕분에 하루가 좀 더 활기차게 시작된다는 점이에요. 
          주변 친구들도 궁금해해서 하나씩 나눠줬더니 반응이 정말 좋더라고요. 
          앞으로도 계속 애용할 생각입니다!"
        </h2>
      </div>
    </section>
  );
}

export default StickySection;