
// 코드가 길어 일부 요약하며 제공하는 완전한 멀티페이지 관리 통합본 예제입니다.
// 기존에 제공한 코드를 droppedComponents -> pages 기반으로 변경한 최종 예시입니다.

import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// 나머지 import는 기존 유지

function TpPage03() {
  const [pages, setPages] = useState([{ id: 1, name: "페이지 1", components: [] }]);
  const [currentPageId, setCurrentPageId] = useState(1);

  const currentComponents = pages.find(p => p.id === currentPageId)?.components || [];

  const handleDrop = (item, index) => {
    const newItem = { ...item, id: Date.now() + Math.random() };
    setPages(prevPages =>
      prevPages.map(page =>
        page.id === currentPageId ? {
          ...page,
          components: [
            ...page.components.slice(0, index),
            newItem,
            ...page.components.slice(index)
          ]
        } : page
      )
    );
  };

  const handleEdit = (index, newData) => {
    setPages(prevPages =>
      prevPages.map(page =>
        page.id === currentPageId ? {
          ...page,
          components: page.components.map((c, i) => i === index ? { ...c, ...newData } : c)
        } : page
      )
    );
  };

  const handleDelete = (index) => {
    setPages(prevPages =>
      prevPages.map(page =>
        page.id === currentPageId ? {
          ...page,
          components: page.components.filter((_, i) => i !== index)
        } : page
      )
    );
  };

  const handleAddPage = () => {
    const newPageId = Date.now();
    setPages([...pages, { id: newPageId, name: `페이지 ${pages.length + 1}`, components: [] }]);
    setCurrentPageId(newPageId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <button onClick={handleAddPage}>페이지 추가하기</button>
      {pages.map(page => (
        <button key={page.id} onClick={() => setCurrentPageId(page.id)}>
          {page.name}
        </button>
      ))}

      <DropCanvas
        components={currentComponents}
        onDrop={handleDrop}
        onDelete={handleDelete}
        onEdit={handleEdit}
        // 기존의 다른 props 유지
      />
    </DndProvider>
  );
}

export default TpPage03;
