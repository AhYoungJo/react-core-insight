import React from "react";

// 일부러 렌더링을 느리게 만드는 컴포넌트
interface SlowItemProps {
  text: string;
}

export const SlowItem = ({ text }: SlowItemProps) => {
  // 간단한 계산으로 CPU 작업을 흉내 내 렌더링을 지연시킵니다.
  let startTime = performance.now();
  while (performance.now() - startTime < 10) {
    // 0.2ms 동안 아무것도 하지 않고 대기
  }
  return <li>{text}</li>;
};
