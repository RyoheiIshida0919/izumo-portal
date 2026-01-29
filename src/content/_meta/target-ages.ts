export interface TargetAge {
  id: string;
  name: string;
  description: string;
}

export const targetAges: TargetAge[] = [
  { id: 'pregnant', name: '妊娠中', description: 'マタニティ向け' },
  { id: '0-1', name: '0〜1歳', description: '赤ちゃん向け' },
  { id: '2-3', name: '2〜3歳', description: '乳幼児向け' },
  { id: '4-6', name: '4〜6歳', description: '幼児向け' },
  { id: 'elementary', name: '小学生', description: '小学生向け' },
  { id: 'all', name: '全年齢', description: '年齢問わず' },
];

export const targetAgeMap = new Map(targetAges.map((t) => [t.id, t]));

export function getTargetAgeName(id: string): string {
  return targetAgeMap.get(id)?.name ?? id;
}
