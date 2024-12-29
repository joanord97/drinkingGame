export const GAME_MODES = [
  {
    id: "never-have-i-ever",
    name: "Never Have I Ever",
    description:
      "Players reveal their experiences and drink if they've done it",
  },
  {
    id: "most-likely-to",
    name: "Most Likely To",
    description: "Vote on who's most likely to do something, majority drinks",
  },
  {
    id: "truth-or-drink",
    name: "Truth or Drink",
    description: "Answer personal questions truthfully or take a drink",
  },
  {
    id: "kings-cup",
    name: "King's Cup",
    description: "Draw cards and follow the rules, classic drinking game",
  },
  {
    id: "would-you-rather",
    name: "Would You Rather",
    description: "Choose between two options, minority drinks",
  },
  {
    id: "hot-seat",
    name: "Hot Seat",
    description: "One player answers questions from everyone or drinks",
  },
] as const;

export type GameMode = (typeof GAME_MODES)[number]["id"];
