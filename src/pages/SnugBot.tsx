import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, ArrowLeft, Plus, MessageSquare, Trash2 } from "lucide-react";
import { authStore, useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

const SnugBot = () => {
  const navigate = useNavigate();
  const { conversations, currentConversationId } = useAuthStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConversationList, setShowConversationList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = currentConversationId 
    ? conversations[currentConversationId]?.messages || []
    : [];

  useEffect(() => {
    const state = authStore.getState();
    if (!state.isAuthenticated) {
      navigate("/auth");
    }
    
    // Create initial conversation if none exists
    if (Object.keys(state.conversations).length === 0) {
      authStore.createConversation();
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const streamChat = async (userMessages: Message[]) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/snugbot-chat`;

    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.");
        return;
      }
      if (resp.status === 402) {
        toast.error("Service requires payment. Please contact support.");
        return;
      }
      throw new Error("Failed to start stream");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;
    let assistantContent = "";

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            if (currentConversationId) {
              authStore.updateStreamingMessage(currentConversationId, assistantContent);
            }
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !currentConversationId) return;

    const userMessage: Message = { role: "user", content: input.trim(), timestamp: Date.now() };
    authStore.addMessage(currentConversationId, userMessage);
    
    const newMessages = [...currentMessages, userMessage];
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
      authStore.removeLastMessage(currentConversationId);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    authStore.createConversation();
    setShowConversationList(false);
    toast.success("New conversation started");
  };

  const handleSelectConversation = (id: string) => {
    authStore.setCurrentConversation(id);
    setShowConversationList(false);
  };

  const handleDeleteConversation = (id: string) => {
    authStore.deleteConversation(id);
    toast.success("Conversation deleted");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <Card className="shadow-float border-2 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
          <div className="gradient-hero p-3 md:p-4 flex items-center gap-2 md:gap-3 border-b-2 border-primary/30">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse-ring">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-primary-foreground text-sm md:text-base truncate">SnugBot</h3>
              <p className="text-xs md:text-sm text-primary-foreground/80 truncate">
                Your AI Pediatric Companion
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 md:h-10 md:w-10 p-0"
              onClick={handleNewConversation}
              title="New Conversation"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 md:h-10 md:w-10 p-0"
              onClick={() => setShowConversationList(!showConversationList)}
              title="Conversations"
            >
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>

          {showConversationList && (
            <div className="p-4 border-b-2 bg-muted/50 max-h-48 overflow-y-auto">
              <h4 className="text-sm font-semibold mb-2">Conversations</h4>
              <div className="space-y-2">
                {Object.entries(conversations).map(([id, conv]) => (
                  <div
                    key={id}
                    className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer hover:bg-muted transition-colors ${
                      id === currentConversationId ? "bg-muted border-primary" : "border-transparent"
                    }`}
                    onClick={() => handleSelectConversation(id)}
                  >
                    <MessageSquare className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-sm truncate">{conv.title}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1 p-3 md:p-6 space-y-4 overflow-y-auto bg-muted/20">
            {currentMessages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 animate-fade-in-up ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`flex-1 ${
                    message.role === "user" ? "flex justify-end" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-3 md:p-4 rounded-2xl shadow-soft max-w-[85%] ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-card text-card-foreground rounded-tl-sm border-2"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-card border-2 rounded-2xl rounded-tl-sm p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 md:p-4 border-t-2 bg-background">
            <div className="flex gap-2">
              <Input
                placeholder="Ask SnugBot anything about baby care..."
                className="flex-1 rounded-full border-2 text-sm md:text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                size="icon"
                className="rounded-full shadow-medium h-9 w-9 md:h-10 md:w-10 flex-shrink-0"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SnugBot;
