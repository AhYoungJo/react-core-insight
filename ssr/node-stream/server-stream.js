import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log("클라이언트로부터 요청이 들어왔습니다.");
  const filePath = "./large-file.mp4";

  // 1. 스트림을 시작하기 전에, 파일의 메타데이터(크기 등)를 먼저 읽습니다.
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  // 2. 알아낸 파일 크기를 Content-Length 헤더에 담아 보냅니다.
  res.writeHead(200, {
    "Content-Type": "video/mp4",
    // "Content-Length": fileSize,
  });

  // 3. 이제 스트림을 생성하고 파이핑합니다.
  const readableStream = fs.createReadStream(filePath);
  readableStream.pipe(res);
});

server.listen(3000, () => {
  console.log(
    "개선된 스트리밍 서버 실행 중. http://localhost:3000 에서 확인하세요."
  );
});
