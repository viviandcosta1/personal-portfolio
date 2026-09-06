export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: 'EXPLORATION' | 'STADIUM' | 'TACTICAL' | 'SECRET';
  points: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_touch',
    title: 'FIRST TOUCH',
    icon: '⚽',
    description: 'Stepped onto the pitch and controlled the football.',
    category: 'STADIUM',
    points: 100
  },
  {
    id: 'on_target',
    title: 'ON TARGET',
    icon: '🎯',
    description: 'Scored a goal in the training ground net!',
    category: 'STADIUM',
    points: 250
  },
  {
    id: 'code_builder',
    title: 'CODE BUILDER',
    icon: '💻',
    description: 'Explored all 5 technical stack lockers in the locker room.',
    category: 'TACTICAL',
    points: 200
  },
  {
    id: 'trophy_hunter',
    title: 'TROPHY HUNTER',
    icon: '🏆',
    description: 'Inspected all 3 championship experience trophies.',
    category: 'EXPLORATION',
    points: 200
  },
  {
    id: 'tactical_genius',
    title: 'TACTICAL GENIUS',
    icon: '🧠',
    description: 'Simulated the full AI/ML Data-to-Production pipeline.',
    category: 'TACTICAL',
    points: 250
  },
  {
    id: 'full_stack',
    title: 'FULL STACK STRIKER',
    icon: '🚀',
    description: 'Reviewed all 3 production projects in the training ground.',
    category: 'EXPLORATION',
    points: 200
  },
  {
    id: 'explorer',
    title: 'TUNNEL EXPLORER',
    icon: '🌟',
    description: 'Discovered the hidden players tunnel & press room terminal.',
    category: 'SECRET',
    points: 300
  }
];
