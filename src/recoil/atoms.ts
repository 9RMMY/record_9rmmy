import { atom } from 'recoil';

export interface Ticket {
  id: number;
  title: string;
  date: string;
  isShared?: boolean; 
}

// 메인 티켓 상태 (Home_band.tsx와 MyPage.tsx에서 공통 사용)
export const ticketsAtom = atom<Ticket[]>({
  key: 'ticketsAtom',
  default: [
    {
      id: 1,
      title: 'Tie Up!',
      date: '2025.02.25',
      isShared: false,
    },
  ],
});

