import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const appHtml = renderToString(<App />);
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
