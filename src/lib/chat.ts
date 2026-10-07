// 브라우저와 서버가 공유하는 것은 메시지 형태와 제한뿐입니다.
export type Message = { role: "user" | "assistant"; content: string };
export type CharacterDisplay = { name: string; description: string; greeting: string };

export const MAX_MESSAGES = 40;
export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_TOTAL_LENGTH = 24000;

// TypeScript 타입은 네트워크 입력을 검증하지 않으므로 실제 값도 검사합니다.
export function validateMessages(value: unknown):
  | { messages: Message[] }
  | { error: string } {
  if (!Array.isArray(value) || value.length === 0) {
    return { error: "대화 메시지를 한 개 이상 보내 주세요." };
  }
  if (value.length > MAX_MESSAGES) {
    return { error: `대화는 요청당 ${MAX_MESSAGES}개까지 가능합니다. 새 대화를 시작해 주세요.` };
  }
  const messages: Message[] = [];
  let total = 0;
  for (const item of value) {
    if (!item || typeof item !== "object" ||
      (item.role !== "user" && item.role !== "assistant") ||
      typeof item.content !== "string" || !item.content.trim()) {
      return { error: "메시지는 user 또는 assistant 역할과 비어 있지 않은 텍스트여야 합니다." };
    }
    if (item.content.length > MAX_MESSAGE_LENGTH) {
      return { error: `메시지 하나는 ${MAX_MESSAGE_LENGTH}자까지 가능합니다.` };
    }
    total += item.content.length;
    messages.push({ role: item.role, content: item.content });
  }
  if (total > MAX_TOTAL_LENGTH) {
    return { error: `전체 대화는 ${MAX_TOTAL_LENGTH}자까지 가능합니다. 새 대화를 시작해 주세요.` };
  }
  if (messages[messages.length - 1].role !== "user") {
    return { error: "마지막 메시지는 사용자의 질문이어야 합니다." };
  }
  return { messages };
}
