// import React, { useState, useRef, useEffect } from 'react';

// const faqData = [
//   {
//     question: 'Q1. 어떤 기준으로 빵을 만드나요?',
//     answer: 'A. 저희는 건강한 재료와 정직한 공정을 가장 중요하게 생각합니다.매일 아침 천연 발효로 숙성된 반죽을 사용하며, 보존료나 인공 향료 없이 빵 본연의 맛을 지켜내고 있어요.',
//   },
//   {
//     question: 'Q2. 질리지 않게 구성되어 있나요?',
//     answer: 'A. 네, 매일 드셔도 새로운 맛을 느낄 수 있도록 다양한 곡물, 크림, 통밀, 건과일 등 소재를 활용한 레시피를 준비하고 있어요. 한 끼 식사로도, 디저트로도 활용하실 수 있어요.',
//   },
//   {
//     question: 'Q3. 바쁜 일상 속에서도 쉽게 구매할 수 있나요?',
//     answer: 'A. 언제든지 편하게 방문하실 수 있도록 오프라인 매장은 물론, 온라인 예약 및 픽업도 지원하고 있어요. 가까운 날에 미리 주문해두시면 따뜻한 빵으로 준비해드립니다.',
//   },
//   {
//     question: 'Q4. “정성이 담긴 식사”라는 건 무슨 의미인가요?',
//     answer: 'A. 식사는 단순한 배 채움이 아니라, 하루를 대하는 자세라고 믿어요. 빵 한 조각이더라도 그 안에 정직한 재료와 따뜻한 마음이 담겨 있으면몸도 마음도 만족스러울 수 있다고 생각해요.',
//   },
//   {
//     question: '조리 방식은 어떻게 되나요?',
//     answer: '신선한 재료 본연의 맛을 살리는 방식으로 조리하며, 튀김보다 굽기나 찜, 삶기 등 건강한 조리법을 우선시하고 있습니다.',
//   },
//   {
//     question: '정성이 담긴 식사는 왜 중요한가요?',
//     answer: '한 끼 식사는 단순한 끼니가 아니라 하루를 채우는 에너지입니다. 그래서 한 끼 한 끼에 진심을 담아, 몸과 마음 모두가 만족할 수 있도록 준비하고 있습니다.',
//   },
//   {
//     question: '매일 먹어도 건강에 무리가 없을까요?',
//     answer: '필수 영양소를 골고루 반영해 균형 잡힌 식단으로 구성되어 있기 때문에 매일 드셔도 부담 없이 건강하게 즐기실 수 있습니다.',
//   },
// ];

// const FaqAccordion = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="Tpsection06"
//     id='part4'>
//       <div className="Tpsection06__textBox">
//         <div className="title">
//           자주 묻는 질문들
//         </div>
//         <div className="subTitle">

//         </div>
//       </div>
//       <div className="faq-container">
//         {faqData.map((item, index) => (
//           <AccordionItem
//             key={index}
//             isOpen={openIndex === index}
//             question={item.question}
//             answer={item.answer}
//             onClick={() => toggleFAQ(index)}
//           />
//         ))}
//       </div>
//     </div>

//   );
// };

// const AccordionItem = ({ isOpen, question, answer, onClick }) => {
//   const contentRef = useRef(null);

//   return (
//     <div className="faq-item">
//       <button
//         className={`faq-question ${isOpen ? 'open' : ''}`}
//         onClick={onClick}
//         aria-expanded={isOpen}
//       >
//         {question}
//         <span className="arrow">{isOpen ? '-' : '+'}</span>
//       </button>
//       <div
//         ref={contentRef}
//         className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}
//         style={{
//           maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
//         }}
//       >
//         <div className="faq-answer">{answer}</div>
//       </div>
//     </div>
//   );
// };

// export default FaqAccordion;



// ✅ TpSection06.jsx (정렬값 반영 + 편집 가능 버전 + TpPage03 적용 버전 + FAQ 추가 기능)
// ✅ TpSection06 - 실시간 반영 가능하도록 리팩터링 (제목, 질문/답변 수정 시 즉시 반영)
import React, { useEffect, useState } from 'react';

const EditFaqModal = ({ data, onChange, onClose }) => {
  const [question, setQuestion] = useState(data.question);
  const [answer, setAnswer] = useState(data.answer);

  useEffect(() => {
    onChange({ question, answer });
  }, [question, answer]);

  return (
    <div style={{ position: 'fixed', top: 150, left: 150, background: '#fff', padding: 20, zIndex: 9999, border: '1px solid #ccc' }}>
      <button onClick={onClose} style={{ float: 'right' }}>❌</button>
      <h3>FAQ 항목 수정</h3>
      <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="질문" style={{ width: '100%', marginBottom: 10 }} />
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="답변" style={{ width: '100%' }} />
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const EditTitleModal = ({ titleText, subTitleText, align, onChange, onClose }) => {
  const [title, setTitle] = useState(titleText);
  const [subTitle, setSubTitle] = useState(subTitleText);
  const [textAlign, setTextAlign] = useState(align || 'center');

  useEffect(() => {
    onChange({ titleText: title, subTitleText: subTitle, align: textAlign });
  }, [title, subTitle, textAlign]);

  const getButtonStyle = (value) => ({
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: textAlign === value ? '#007bff' : '#f0f0f0',
    color: textAlign === value ? 'white' : 'black'
  });

  return (
    <div style={{ position: 'fixed', top: 100, left: 100, background: '#fff', padding: 20, zIndex: 9999, border: '1px solid #ccc' }}>
      <button onClick={onClose} style={{ float: 'right' }}>❌</button>
      <h3>제목 수정</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="메인 제목" style={{ width: '100%', marginBottom: 10 }} />
      <textarea value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="서브 제목" style={{ width: '100%', marginBottom: 10 }} />

      <div style={{ display: 'flex', gap: '8px', marginBottom: 10 }}>
        <button onClick={() => setTextAlign('left')} style={getButtonStyle('left')}>좌측</button>
        <button onClick={() => setTextAlign('center')} style={getButtonStyle('center')}>중앙</button>
        <button onClick={() => setTextAlign('right')} style={getButtonStyle('right')}>우측</button>
      </div>

      <button onClick={onClose}>닫기</button>
    </div>
  );
};

function TpSection06({ data = [], titleText: initialTitle = "자주 묻는 질문들", subTitleText: initialSub = "자주 들어오는 질문과 답변을 모았습니다.", align: initialAlign = 'center', onUpdate }) {
  const [faqList, setFaqList] = useState(data);
  const [openIndex, setOpenIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);

  const [titleText, setTitleText] = useState(initialTitle);
  const [subTitleText, setSubTitleText] = useState(initialSub);
  const [textAlign, setTextAlign] = useState(initialAlign);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFaqChange = (newData) => {
    const updated = faqList.map((faq, i) => i === editingIndex ? { ...faq, ...newData } : faq);
    setFaqList(updated);
  };

  const handleTitleChange = ({ titleText, subTitleText, align }) => {
    setTitleText(titleText);
    setSubTitleText(subTitleText);
    setTextAlign(align);
  };

  const handleAddFaq = () => {
    setFaqList((prev) => [...prev, { question: "새 질문입니다.", answer: "새 답변입니다." }]);
  };

  useEffect(() => {
    onUpdate?.({ data: faqList, titleText, subTitleText, align: textAlign });
  }, [faqList, titleText, subTitleText, textAlign]);

  return (
    <section className="Tpsection06">
      <div
        className="Tpsection06__textBox"
        onClick={() => setEditingTitle(true)}
        style={{ cursor: 'pointer', textAlign }}
      >
        <h2 className="title">{titleText}</h2>
        <h3 className="subTitle">
          {subTitleText.split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h3>
      </div>

      <div className="faq-container">
        {faqList.map((item, index) => (
          <div className="faq-item" key={index} onClick={() => setEditingIndex(index)} style={{ cursor: 'pointer' }}>
            <button
              className={`faq-question ${openIndex === index ? 'open' : ''}`}
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <span className="arrow">{openIndex === index ? '-' : '+'}</span>
            </button>
            <div
              className={`faq-answer-wrapper ${openIndex === index ? 'open' : ''}`}
              style={{
                maxHeight: openIndex === index ? '300px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}
            >
              <div className="faq-answer">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button onClick={handleAddFaq} style={{ padding: '10px 20px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}>+ 라인 추가</button>
      </div>

      {editingIndex !== null && (
        <EditFaqModal
          data={faqList[editingIndex]}
          onChange={handleFaqChange}
          onClose={() => setEditingIndex(null)}
        />
      )}

      {editingTitle && (
        <EditTitleModal
          titleText={titleText}
          subTitleText={subTitleText}
          align={textAlign}
          onChange={handleTitleChange}
          onClose={() => setEditingTitle(false)}
        />
      )}
    </section>
  );
}

export default TpSection06;


