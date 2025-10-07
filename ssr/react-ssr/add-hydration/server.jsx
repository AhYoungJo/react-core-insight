import express from "express";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import HydrationApp from "./HydrationApp.jsx";
import { build } from "esbuild"; // JS 번들링을 위한 esbuild

// --- 클라이언트 스크립트 번들링 ---
await build({
  entryPoints: ["./Main.jsx"],
  bundle: true,
  outfile: "public/Main.js",
  format: "esm",
  loader: { ".js": "jsx" },
}).catch(() => process.exit(1));
// ---------------------------------

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const { pipe } = renderToPipeableStream(<HydrationApp title="서버에서 렌더링" />, {
    // 셸(초기 HTML)이 준비되면 스트리밍 시작
    onShellReady() {
      res.statusCode = 200;
      pipe(res);
    },
    // 전체 렌더링이 완료되었을 때 호출 (크롤러 등을 위해)
    onAllReady() {
      console.log("모든 컨텐츠 스트리밍 완료.");
    },
    onError(err) {
      console.error("스트리밍 에러:", err);
    },
  });
});

app.listen(3000, () => {
  console.log(
    "React 스트리밍/하이드레이션 서버 실행 중. http://localhost:3000"
  );
});
