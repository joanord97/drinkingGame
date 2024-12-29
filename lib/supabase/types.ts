export type Tables = {
  sessions: {
    Row: {
      id: string;
      created_at: string;
      game_mode: string | null;
      password: string | null;
      status: "waiting" | "in_progress" | "finished";
    };
    Insert: {
      id?: string;
      created_at?: string;
      game_mode?: string | null;
      password?: string | null;
      status?: "waiting" | "in_progress" | "finished";
    };
    Update: {
      id?: string;
      created_at?: string;
      game_mode?: string | null;
      password?: string | null;
      status?: "waiting" | "in_progress" | "finished";
    };
  };
  players: {
    Row: {
      id: string;
      session_id: string;
      name: string;
      avatar_url: string | null;
      created_at: string;
      ready: boolean;
    };
    Insert: {
      id?: string;
      session_id: string;
      name: string;
      avatar_url?: string | null;
      created_at?: string;
      ready?: boolean;
    };
    Update: {
      id?: string;
      session_id?: string;
      name?: string;
      avatar_url?: string | null;
      created_at?: string;
      ready?: boolean;
    };
  };
};
