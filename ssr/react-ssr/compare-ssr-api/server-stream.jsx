import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const { pipe } = renderToPipeableStream(<App />, {
    onShellReady() {
      console.log("초기 셸 준비 완료. 스트리밍 시작!");
      pipe(res);
    },
    onError(err) {
      console.error("스트리밍 에러:", err);
    },
  });
});

app.listen(3000, () => {
  console.log(
    "React 스트리밍 서버 실행 중. http://localhost:3000 에서 확인하세요."
  );
});
