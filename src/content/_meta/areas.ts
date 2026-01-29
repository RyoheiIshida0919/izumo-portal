export interface Area {
  id: string;
  name: string;
  description: string;
}

export const areas: Area[] = [
  { id: 'izumo', name: '出雲', description: '出雲市街地エリア' },
  { id: 'taisha', name: '大社', description: '出雲大社周辺エリア' },
  { id: 'hirata', name: '平田', description: '平田エリア' },
  { id: 'hikawa', name: '斐川', description: '斐川エリア' },
  { id: 'sada', name: '佐田', description: '佐田エリア' },
  { id: 'taki', name: '多伎', description: '多伎エリア' },
  { id: 'koryo', name: '湖陵', description: '湖陵エリア' },
];

export const areaMap = new Map(areas.map((a) => [a.id, a]));

export function getAreaName(id: string): string {
  return areaMap.get(id)?.name ?? id;
}
