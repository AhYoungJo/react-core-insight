import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const ids = [1, 2, 3, 4];
  const posts = await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      return response.json();
    })
  );

  const appHtml = renderToString(<App posts={posts} />);
  console.log("렌더링 완료. HTML 전체를 한 번에 전송합니다.");

  const fullHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>React Non-Streaming SSR</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
  `;

  res.end(fullHtml);
});

app.listen(3001, () => {
  console.log(
    "React 비-스트리밍 서버 실행 중. http://localhost:3001 에서 확인하세요."
  );
});
