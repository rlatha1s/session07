import Chat from "@/components/Chat";
import { character } from "@/prompts/character";

export default function Home() {
  // 서버 페이지에서 표시 정보만 골라 보냅니다. 전체 설정과 instructions는 서버에 남습니다.
  // [확장 포인트] 여러 캐릭터를 만들 때는 여기서 선택한 캐릭터의 표시 정보를 전달하고,
  // API에서도 해당 캐릭터 ID를 검증하여 같은 설정을 선택하도록 바꿉니다.
  return <Chat character={{
    name: character.name,
    description: character.description,
    greeting: character.greeting,
  }} />;
}
