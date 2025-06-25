import { Injectable, Scope } from '@nestjs/common';

// 인젝션 스코프 Default => 싱글톤으로 할래 말래. (new 한 번)
// Request 스코프로 할래? (매 요청마다 new)
// Transient 스코프로 할래? (매 주입마다 new)

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
