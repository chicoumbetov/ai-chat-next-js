import { ChatWindow } from '@/modules/chat/presentation/ChatWindow';
import { ThemeProvider } from '@/modules/core/providers/ThemeProvider';

export default function Page() {
  return (
    <main>
      <ThemeProvider>
        <ChatWindow />
      </ThemeProvider>
    </main>
  );
}
