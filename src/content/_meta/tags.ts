export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

export const tags: Tag[] = [
  { id: 'nursing-room', name: '授乳室', icon: '🍼' },
  { id: 'diaper-change', name: 'オムツ替え', icon: '👶' },
  { id: 'stroller-ok', name: 'ベビーカーOK', icon: '🛒' },
  { id: 'parking', name: '駐車場あり', icon: '🅿️' },
  { id: 'reservation', name: '予約制', icon: '📅' },
  { id: 'free', name: '無料', icon: '🆓' },
  { id: 'kids-menu', name: 'キッズメニュー', icon: '🍴' },
  { id: 'kids-space', name: 'キッズスペース', icon: '🧸' },
  { id: 'private-room', name: '個室あり', icon: '🚪' },
  { id: 'tatami', name: '座敷あり', icon: '🏠' },
  { id: 'wheelchair', name: '車椅子対応', icon: '♿' },
  { id: 'credit-card', name: 'カード払い可', icon: '💳' },
  { id: 'online-booking', name: 'ネット予約可', icon: '📱' },
  { id: 'takeout', name: 'テイクアウト可', icon: '🥡' },
  { id: 'english', name: '英語対応', icon: '🌐' },
];

export const tagMap = new Map(tags.map((t) => [t.id, t]));

export function getTagName(id: string): string {
  return tagMap.get(id)?.name ?? id;
}

export function getTagIcon(id: string): string | undefined {
  return tagMap.get(id)?.icon;
}
