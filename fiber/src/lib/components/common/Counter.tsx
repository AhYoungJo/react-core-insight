import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // setCount를 3번 호출합니다.
    setCount((c: number) => c + 1);
    setCount((c: number) => c + 1);
    setCount((c: number) => c + 1);
  };

  return (
    <>
      <button onClick={handleClick}>카운트: {count}</button>
    </>
  );
}
