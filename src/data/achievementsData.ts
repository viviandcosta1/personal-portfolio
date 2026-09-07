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
    title: 'LOCKER ROOM CRAFT',
    icon: '💻',
    description: 'Explored the 10 technology lockers in the locker room.',
    category: 'TACTICAL',
    points: 200
  },
  {
    id: 'trophy_hunter',
    title: 'CHAMPIONS TROPHY ROOM',
    icon: '🏆',
    description: 'Inspected all 3 championship career milestones.',
    category: 'EXPLORATION',
    points: 200
  },
  {
    id: 'tactical_genius',
    title: 'TACTICAL FORMATION',
    icon: '🧠',
    description: 'Executed the tactical formation and full-stack architecture pass.',
    category: 'TACTICAL',
    points: 250
  },
  {
    id: 'full_stack',
    title: 'MATCH WINNER',
    icon: '🚀',
    description: 'Reviewed all production software projects in the stadium.',
    category: 'EXPLORATION',
    points: 200
  },
  {
    id: 'mentality_07',
    title: 'MENTALITY MODE #07',
    icon: '👑',
    description: 'Pressed [7] to activate the hidden Number 7 Mentality Mode.',
    category: 'SECRET',
    points: 700
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
