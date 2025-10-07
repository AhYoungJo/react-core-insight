import React, { Suspense } from "react";

async function SlowHeader() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <header>✅ 헤더가 1초만에 로드되었습니다.</header>;
}

async function SlowMainContent() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <main>✅ 메인 컨텐츠가 2초만에 로드되었습니다.</main>;
}

async function SlowFooter() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return <footer>✅ 푸터가 3초만에 로드되었습니다.</footer>;
}

export default function App() {
  return (
    <html lang="ko">
      <head>
        <title>React SSR 비교</title>
        <meta charSet="utf-8" />
      </head>
      <body>
        <h1>안녕하세요, SSR 테스트 페이지입니다.</h1>
        <p>이 내용은 즉시 렌더링됩니다.</p>
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
