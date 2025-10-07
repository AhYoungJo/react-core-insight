import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  console.log("클라이언트로부터 요청이 들어왔습니다.");

  try {
    // 1. 파일을 '동기적으로' 읽어 메모리에 전부 로드합니다. (Blocking)
    // 파일이 크면 클수록 이 과정에서 서버가 멈춰있게 됩니다.
    console.log("파일을 메모리로 읽는 중...");
    const fileBuffer = fs.readFileSync("./large-file.mp4");
    console.log(
      `파일 읽기 완료. 메모리에 ${fileBuffer.length} 바이트를 로드했습니다.`
    );

    // 2. 응답 헤더를 작성합니다.
    res.writeHead(200, {
      "Content-Type": "video/mp4",
      "Content-Length": fileBuffer.length, // 전체 파일 크기를 명시
    });

    // 3. 메모리에 있는 파일 전체를 한 번에 전송합니다.
    res.end(fileBuffer);
    console.log("파일 전체를 한 번에 전송했습니다.");
  } catch (err) {
    console.error("파일 처리 에러:", err);
    res.statusCode = 500;
    res.end("파일을 처리하는 중 에러가 발생했습니다.");
  }
});

server.listen(3001, () => {
  console.log(
    "스트림 미사용 서버 실행 중. http://localhost:3001 에서 확인하세요."
  );
});
