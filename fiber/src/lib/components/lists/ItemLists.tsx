import React, { useMemo } from "react";
import { SlowItem } from "./Item";

interface ItemListsProps {
  searchQuery: string;
  allItems: string[];
}

export function ItemLists({
  searchQuery,
  allItems,
}: ItemListsProps) {
  // 검색어에 따라 목록 필터링 (useMemo로 searchQuery가 바뀔 때만 실행)
  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter((item) => item.includes(searchQuery));
  }, [allItems, searchQuery]);

  return (
    <>
      <ul>
        {filteredItems.slice(0, 200).map((item) => (
          <SlowItem key={item} text={item} />
        ))}
      </ul>
    </>
  );
}
