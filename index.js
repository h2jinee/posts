import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# my posts 🗒️

### 📚 Currently Learning

| Subject            |
|--------------------|
| **Spring**          |
| **Network**         |
| **Operating Systems** |
| **Modern Java**     |
| **JPA**             |

---

### 📚 Reading Now

| Book                                   |
|----------------------------------------|
| **Clean Code**: Robert C. Martin       |
| **자바의 신**                           |
| **그림으로 배우는 네트워크 원리**         |

---

## 📕 Latest Blog Posts

| No. | Title                              |
|-----|------------------------------------|
`;


// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://hoojjang.tistory.com/rss'); // 본인의 블로그 주소
    
    // 최신 글의 개수와 10 중 작은 값을 사용해 반복
    for (let i = 0; i < Math.min(feed.items.length, 10); i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `| ${i + 1} | [${title}](${link}) |\n`;
    }

    // 만약 글이 하나도 없는 경우를 대비한 처리
    if (feed.items.length === 0) {
        console.log('게시물이 없습니다.');
        text += `| - | 게시물이 없습니다. |\n`;
    }

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();