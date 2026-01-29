export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Subcategory {
  id: string;
  name: string;
  parentId: string;
}

export const categories: Category[] = [
  { id: 'eat', name: '食べる', icon: '🍽️', description: '子連れで行けるカフェ・レストラン' },
  { id: 'learn', name: '学ぶ', icon: '📚', description: '習い事・教室・学習支援' },
  { id: 'support', name: '子育てサポート', icon: '🤝', description: '保育・一時預かり・相談窓口' },
  { id: 'experience', name: '体験する・買う', icon: '🎨', description: '遊び場・イベント・ショップ' },
  { id: 'health', name: '体をケアする', icon: '🏥', description: '病院・クリニック・歯医者' },
  { id: 'relax', name: 'リラックス', icon: '💆', description: '産後ケア・マッサージ・美容室' },
];

export const subcategories: Subcategory[] = [
  // 食べる
  { id: 'cafe', name: 'カフェ', parentId: 'eat' },
  { id: 'restaurant', name: 'レストラン', parentId: 'eat' },
  { id: 'kodomo-shokudo', name: 'こども食堂', parentId: 'eat' },
  { id: 'bakery', name: 'パン屋', parentId: 'eat' },
  { id: 'sweets', name: 'スイーツ', parentId: 'eat' },

  // 学ぶ
  { id: 'lessons', name: '習い事', parentId: 'learn' },
  { id: 'music', name: '音楽教室', parentId: 'learn' },
  { id: 'english', name: '英語教室', parentId: 'learn' },
  { id: 'sports', name: 'スポーツ教室', parentId: 'learn' },
  { id: 'art', name: 'アート・絵画教室', parentId: 'learn' },
  { id: 'programming', name: 'プログラミング教室', parentId: 'learn' },

  // 子育てサポート
  { id: 'nursery', name: '保育園・幼稚園', parentId: 'support' },
  { id: 'temporary-care', name: '一時預かり', parentId: 'support' },
  { id: 'consultation', name: '相談窓口', parentId: 'support' },
  { id: 'support-center', name: '子育て支援センター', parentId: 'support' },
  { id: 'sick-child-care', name: '病児保育', parentId: 'support' },

  // 体験する・買う
  { id: 'park', name: '公園', parentId: 'experience' },
  { id: 'indoor-play', name: '室内遊び場', parentId: 'experience' },
  { id: 'workshop', name: 'ワークショップ', parentId: 'experience' },
  { id: 'baby-goods', name: 'ベビー用品', parentId: 'experience' },
  { id: 'kids-clothes', name: '子供服', parentId: 'experience' },
  { id: 'bookstore', name: '本屋', parentId: 'experience' },

  // 体をケアする
  { id: 'pediatrics', name: '小児科', parentId: 'health' },
  { id: 'dentist', name: '歯医者', parentId: 'health' },
  { id: 'dermatology', name: '皮膚科', parentId: 'health' },
  { id: 'ophthalmology', name: '眼科', parentId: 'health' },
  { id: 'ent', name: '耳鼻科', parentId: 'health' },

  // リラックス
  { id: 'postpartum-care', name: '産後ケア', parentId: 'relax' },
  { id: 'massage', name: 'マッサージ・整体', parentId: 'relax' },
  { id: 'hair-salon', name: '美容室', parentId: 'relax' },
  { id: 'nail', name: 'ネイル', parentId: 'relax' },
];

export const categoryMap = new Map(categories.map((c) => [c.id, c]));
export const subcategoryMap = new Map(subcategories.map((s) => [s.id, s]));

export function getCategoryName(id: string): string {
  return categoryMap.get(id)?.name ?? id;
}

export function getSubcategoryName(id: string): string {
  return subcategoryMap.get(id)?.name ?? id;
}

export function getSubcategoriesByParent(parentId: string): Subcategory[] {
  return subcategories.filter((s) => s.parentId === parentId);
}
