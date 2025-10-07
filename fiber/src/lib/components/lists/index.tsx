import React, { useState, useTransition, useMemo } from "react";
import "./App.css"; // 간단한 스타일링을 위해 기본 CSS를 사용합니다.
import { Input } from "./input";
import { ItemLists } from "./ItemLists";

export function ListsApp() {
  // 1. 상태 변수 설정
  // 사용자의 입력을 즉시 보여주기 위한 상태 (고순위)
  const [inputValue, setInputValue] = useState("");
  // 실제 목록 필터링에 사용될 검색어 상태 (저순위)
  const [searchQuery, setSearchQuery] = useState("");

  // 2. useTransition 설정
  const [isPending, startTransition] = useTransition();

  // 3. 10,000개의 아이템을 가진 무거운 목록 생성 (useMemo로 최초 한 번만 생성)
  const allItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 10000; i++) {
      items.push(`아이템 ${i}`);
    }
    return items;
  }, []);

  // 4. 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 고순위 업데이트: Input의 값은 즉시 변경되어야 합니다.
    setInputValue(e.target.value);

    // 저순위 업데이트: startTransition으로 감싸 리액트에 우선순위가 낮음을 알립니다.
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return (
    <div className="App">
      <h1>업데이트 우선순위 테스트</h1>
      <Input value={inputValue} onChange={handleInputChange} />{" "}
      {/* isPending 상태를 이용해 저순위 작업 진행 중임을 표시 */}
      {isPending ? (
        <p className="loading">목록 업데이트 중...</p>
      ) : (
        <ItemLists searchQuery={searchQuery} allItems={allItems} />
      )}
      {/* <ItemLists searchQuery={searchQuery} allItems={allItems} /> */}
    </div>
  );
}

export default ListsApp;
