import React, { Suspense } from "react";

async function SlowMainContent({ id }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await response.json();

  return (
    <main>
      <hr />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
    </main>
  );
}

function MainContent({ post }) {
  return (
    <main>
      <hr />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <hr />
    </main>
  );
}

export default function App({ posts }) {
  return (
    <html lang="ko">
      <head>
        <title>React SSR 비교</title>
        <meta charSet="utf-8" />
      </head>
      <body>
        <h1>안녕하세요, SSR 테스트 페이지입니다.</h1>
        <hr />

        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => <MainContent key={post.id} post={post} />)
        ) : (
          <Suspense
            fallback={<main>메인 컨텐츠 로딩 중... 💨 (2초 소요)</main>}
          >
            <SlowMainContent id={1} />
            <SlowMainContent id={2} />
            <SlowMainContent id={3} />
            <SlowMainContent id={4} />
          </Suspense>
        )}
      </body>
    </html>
  );
}
