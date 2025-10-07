import React, { Suspense, useState, useEffect } from "react";

function wrapPromise(promise) {
  let status = "pending";
  let result;
  const suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

const headerResource = wrapPromise(
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("✅ 헤더가 1초만에 로드되었습니다.");
    }, 1000)
  )
);

const mainResource = wrapPromise(
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("✅ 메인 컨텐츠가 2초만에 로드되었습니다.");
    }, 2000)
  )
);

const footerResource = wrapPromise(
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("✅ 푸터가 3초만에 로드되었습니다.");
    }, 3000)
  )
);

function SlowHeader() {
  const data = headerResource.read();
  return <header>{data}</header>;
}

function SlowMainContent() {
  const data = mainResource.read();
  return <main>{data}</main>;
}

function SlowFooter() {
  const data = footerResource.read();
  return (
    <footer>
      <p>{data}</p>
      <InteractiveButton />
    </footer>
  );
}

//하이드레이션 이후에만 동작
function InteractiveButton() {
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <button onClick={() => setCount(count + 1)}>
      {hydrated ? `클릭! (${count})` : "하이드레이션 전..."}
    </button>
  );
}

export default function HydrationApp() {
  return (
    <html lang="ko">
      <head>
        <title>React Streaming & Hydration</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="React 서버 사이드 렌더링의 스트리밍과 하이드레이션을 테스트하는 예제 페이지입니다."
        />
        <script src="/Main.js" async></script>
      </head>
      <body>
        <h1>안녕하세요, 스트리밍 & 하이드레이션 테스트입니다.</h1>
        <hr />
        <Suspense fallback={<h2>헤더 로딩 중... 💨 (1초 소요)</h2>}>
          <SlowHeader />
        </Suspense>
        <hr />
        <Suspense fallback={<main>메인 컨텐츠 로딩 중... 💨 (2초 소요)</main>}>
          <SlowMainContent />
        </Suspense>
        <hr />
        <Suspense fallback={<footer>푸터 로딩 중... 💨 (3초 소요)</footer>}>
          <SlowFooter />
        </Suspense>
      </body>
    </html>
  );
}
