interface User {
  id: string;
  name: string;
  email: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface GrowthData {
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
}

interface SleepData {
  date: string;
  duration: number;
  quality: string;
  notes: string;
}

interface NutritionData {
  date: string;
  meals: string[];
  allergies: string[];
  notes: string;
}

interface WellnessData {
  date: string;
  mood: string;
  stressLevel: number;
  notes: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  membershipTier: 'free' | 'monthly' | 'annual';
  conversations: Record<string, Conversation>;
  currentConversationId: string | null;
  growthData: GrowthData[];
  sleepData: SleepData[];
  nutritionData: NutritionData[];
  wellnessData: WellnessData[];
  babyProfile: {
    name: string;
    birthDate: string;
    gender: string;
  } | null;
}

const AUTH_STORAGE_KEY = 'snuggles_auth';

class AuthStore {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    membershipTier: 'free',
    conversations: {},
    currentConversationId: null,
    growthData: [],
    sleepData: [],
    nutritionData: [],
    wellnessData: [],
    babyProfile: null,
  };

  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        this.state = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored auth state');
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.state));
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): AuthState {
    return { ...this.state };
  }

  register(name: string, email: string, password: string): boolean {
    // Mock registration - in real app, would validate and hash password
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
    };

    this.state = {
      ...this.state,
      user,
      isAuthenticated: true,
    };

    // Create initial conversation
    if (Object.keys(this.state.conversations).length === 0) {
      this.createConversation();
    }

    this.saveToStorage();
    return true;
  }

  login(email: string, password: string): boolean {
    // Mock login - in real app, would verify credentials
    const user: User = {
      id: Math.random().toString(36).substring(7),
      name: email.split('@')[0],
      email,
    };

    this.state = {
      ...this.state,
      user,
      isAuthenticated: true,
    };

    // Create initial conversation if none exists
    if (Object.keys(this.state.conversations).length === 0) {
      this.createConversation();
    }

    this.saveToStorage();
    return true;
  }

  logout() {
    this.state = {
      user: null,
      isAuthenticated: false,
      membershipTier: 'free',
      conversations: {},
      currentConversationId: null,
      growthData: [],
      sleepData: [],
      nutritionData: [],
      wellnessData: [],
      babyProfile: null,
    };

    this.saveToStorage();
  }

  upgradeMembership(tier: 'monthly' | 'annual') {
    this.state.membershipTier = tier;
    this.saveToStorage();
  }

  isPremium(): boolean {
    return this.state.membershipTier === 'monthly' || this.state.membershipTier === 'annual';
  }

  // Conversation Management
  createConversation(): string {
    const id = `conv_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const conversation: Conversation = {
      id,
      title: `Conversation ${Object.keys(this.state.conversations).length + 1}`,
      messages: [{
        role: "assistant",
        content: "Hello! I'm SnugBot, your caring AI companion. I'm here to support you with verified, expert-backed guidance for your baby's care. How can I help you today?",
        timestamp: Date.now(),
      }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.state.conversations[id] = conversation;
    this.state.currentConversationId = id;
    this.saveToStorage();
    return id;
  }

  setCurrentConversation(id: string) {
    if (this.state.conversations[id]) {
      this.state.currentConversationId = id;
      this.saveToStorage();
    }
  }

  deleteConversation(id: string) {
    delete this.state.conversations[id];
    
    // If deleting current conversation, switch to another or create new
    if (this.state.currentConversationId === id) {
      const remainingIds = Object.keys(this.state.conversations);
      if (remainingIds.length > 0) {
        this.state.currentConversationId = remainingIds[0];
      } else {
        this.createConversation();
      }
    }
    
    this.saveToStorage();
  }

  addMessage(conversationId: string, message: Message) {
    const conversation = this.state.conversations[conversationId];
    if (conversation) {
      conversation.messages.push({
        ...message,
        timestamp: Date.now(),
      });
      conversation.updatedAt = Date.now();
      
      // Update title based on first user message
      if (conversation.messages.length === 2 && message.role === "user") {
        conversation.title = message.content.substring(0, 50) + (message.content.length > 50 ? "..." : "");
      }
      
      this.saveToStorage();
    }
  }

  updateStreamingMessage(conversationId: string, content: string) {
    const conversation = this.state.conversations[conversationId];
    if (conversation) {
      const lastMessage = conversation.messages[conversation.messages.length - 1];
      
      if (lastMessage?.role === "assistant") {
        lastMessage.content = content;
        lastMessage.timestamp = Date.now();
      } else {
        conversation.messages.push({
          role: "assistant",
          content,
          timestamp: Date.now(),
        });
      }
      
      conversation.updatedAt = Date.now();
      this.notifyListeners();
    }
  }

  removeLastMessage(conversationId: string) {
    const conversation = this.state.conversations[conversationId];
    if (conversation && conversation.messages.length > 1) {
      conversation.messages.pop();
      conversation.updatedAt = Date.now();
      this.saveToStorage();
    }
  }

  // Data Management
  addGrowthData(data: Omit<GrowthData, 'date'>) {
    this.state.growthData.push({
      ...data,
      date: new Date().toISOString(),
    });
    this.saveToStorage();
  }

  addSleepData(data: Omit<SleepData, 'date'>) {
    this.state.sleepData.push({
      ...data,
      date: new Date().toISOString(),
    });
    this.saveToStorage();
  }

  addNutritionData(data: Omit<NutritionData, 'date'>) {
    this.state.nutritionData.push({
      ...data,
      date: new Date().toISOString(),
    });
    this.saveToStorage();
  }

  addWellnessData(data: Omit<WellnessData, 'date'>) {
    this.state.wellnessData.push({
      ...data,
      date: new Date().toISOString(),
    });
    this.saveToStorage();
  }

  updateBabyProfile(profile: AuthState['babyProfile']) {
    this.state.babyProfile = profile;
    this.saveToStorage();
  }

  getGrowthData(): GrowthData[] {
    return [...this.state.growthData];
  }

  getSleepData(): SleepData[] {
    return [...this.state.sleepData];
  }

  getNutritionData(): NutritionData[] {
    return [...this.state.nutritionData];
  }

  getWellnessData(): WellnessData[] {
    return [...this.state.wellnessData];
  }

  updateUserProfile(name: string) {
    if (this.state.user) {
      this.state.user.name = name;
      this.saveToStorage();
    }
  }
}

export const authStore = new AuthStore();

// Hook for React components
import React from 'react';

export function useAuthStore() {
  const [state, setState] = React.useState(authStore.getState());
  
  React.useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setState(authStore.getState());
    });
    return unsubscribe;
  }, []);

  return {
    ...state,
    isPremium: () => authStore.isPremium(),
    upgradeMembership: (tier: 'monthly' | 'annual') => authStore.upgradeMembership(tier),
    updateUserProfile: (name: string) => authStore.updateUserProfile(name),
  };
}
