import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const servicesDir = path.join(__dirname, '../src/content/services');
const eventsDir = path.join(__dirname, '../src/content/events');

// メタデータ
const areas = ['izumo', 'taisha', 'hirata', 'hikawa', 'sada', 'taki', 'koryo'];
const categories = ['eat', 'learn', 'support', 'experience', 'health', 'relax'];

const subcategoriesByCategory = {
  eat: ['cafe', 'restaurant', 'kodomo-shokudo', 'bakery', 'sweets'],
  learn: ['lessons', 'music', 'english', 'sports', 'art', 'programming'],
  support: ['nursery', 'temporary-care', 'consultation', 'support-center', 'sick-child-care'],
  experience: ['park', 'indoor-play', 'workshop', 'baby-goods', 'kids-clothes', 'bookstore'],
  health: ['pediatrics', 'dentist', 'dermatology', 'ophthalmology', 'ent'],
  relax: ['postpartum-care', 'massage', 'hair-salon', 'nail'],
};

const tags = [
  'nursing-room', 'diaper-change', 'stroller-ok', 'parking', 'reservation',
  'free', 'kids-menu', 'kids-space', 'private-room', 'tatami',
  'wheelchair', 'credit-card', 'online-booking', 'takeout'
];

const targetAges = ['pregnant', '0-1', '2-3', '4-6', 'elementary', 'all'];

// サービスデータテンプレート
const serviceTemplates = [
  // eat - カフェ
  { category: 'eat', subcategory: 'cafe', titleBase: 'キッズカフェ', summary: '子連れで安心して過ごせるカフェです。キッズスペース完備。' },
  { category: 'eat', subcategory: 'cafe', titleBase: '親子カフェ', summary: 'ベビーカーでも入りやすい広々としたカフェ。離乳食持ち込みOK。' },
  { category: 'eat', subcategory: 'restaurant', titleBase: 'ファミリーレストラン', summary: 'キッズメニュー充実。個室もあるので周りを気にせず食事できます。' },
  { category: 'eat', subcategory: 'kodomo-shokudo', titleBase: 'こども食堂', summary: '地域の子どもたちに温かい食事を提供しています。' },
  { category: 'eat', subcategory: 'bakery', titleBase: 'ベーカリー', summary: '国産小麦使用の安心パン。子ども向けパンも人気です。' },

  // learn - 習い事
  { category: 'learn', subcategory: 'music', titleBase: 'リトミック教室', summary: '0歳から通える音楽教室。親子で楽しくリズム遊び。' },
  { category: 'learn', subcategory: 'english', titleBase: '英会話スクール', summary: 'ネイティブ講師による子ども向け英会話。楽しく英語を学べます。' },
  { category: 'learn', subcategory: 'sports', titleBase: 'スイミングスクール', summary: 'ベビースイミングから小学生まで。水が苦手な子も安心。' },
  { category: 'learn', subcategory: 'art', titleBase: '絵画教室', summary: '自由に創作を楽しむ子ども向けアート教室。' },
  { category: 'learn', subcategory: 'programming', titleBase: 'プログラミング教室', summary: '小学生から始めるプログラミング。論理的思考力を育てます。' },

  // support - 子育てサポート
  { category: 'support', subcategory: 'support-center', titleBase: '子育て支援センター', summary: '親子で遊べる広場。育児相談も気軽にできます。' },
  { category: 'support', subcategory: 'temporary-care', titleBase: '一時預かり保育', summary: 'リフレッシュや用事の際に便利な一時預かりサービス。' },
  { category: 'support', subcategory: 'consultation', titleBase: '子育て相談窓口', summary: '育児の悩みを専門スタッフがサポート。' },
  { category: 'support', subcategory: 'sick-child-care', titleBase: '病児保育室', summary: '病気の回復期のお子さんをお預かりします。' },
  { category: 'support', subcategory: 'nursery', titleBase: '認定こども園', summary: '教育と保育を一体的に行う施設です。' },

  // experience - 体験
  { category: 'experience', subcategory: 'park', titleBase: '児童公園', summary: '遊具が充実した子どもに人気の公園。' },
  { category: 'experience', subcategory: 'indoor-play', titleBase: '室内遊び場', summary: '雨の日でも安心して遊べる室内施設。' },
  { category: 'experience', subcategory: 'workshop', titleBase: '親子ワークショップ', summary: '季節のイベントや工作教室を開催。' },
  { category: 'experience', subcategory: 'baby-goods', titleBase: 'ベビー用品店', summary: 'ベビーカーやチャイルドシートなど豊富に揃っています。' },
  { category: 'experience', subcategory: 'kids-clothes', titleBase: 'キッズ服専門店', summary: 'かわいくてお手頃な子供服が揃うお店。' },

  // health - 病院
  { category: 'health', subcategory: 'pediatrics', titleBase: '小児科クリニック', summary: '予防接種から一般診療まで。キッズスペースあり。' },
  { category: 'health', subcategory: 'dentist', titleBase: '小児歯科', summary: '子どもが怖がらない優しい歯医者さん。' },
  { category: 'health', subcategory: 'dermatology', titleBase: '皮膚科', summary: '赤ちゃんの肌トラブルもお気軽にご相談ください。' },
  { category: 'health', subcategory: 'ophthalmology', titleBase: '眼科', summary: '子どもの視力検査・治療に対応。' },
  { category: 'health', subcategory: 'ent', titleBase: '耳鼻咽喉科', summary: '中耳炎やアレルギーなど子どもの耳鼻科疾患に対応。' },

  // relax - リラックス
  { category: 'relax', subcategory: 'postpartum-care', titleBase: '産後ケア施設', summary: '産後のママをサポート。骨盤ケアやカウンセリング。' },
  { category: 'relax', subcategory: 'massage', titleBase: '整体院', summary: '子連れOKの整体。抱っこで疲れた体をケア。' },
  { category: 'relax', subcategory: 'hair-salon', titleBase: '美容室', summary: 'キッズスペース完備。ママもリフレッシュ。' },
  { category: 'relax', subcategory: 'nail', titleBase: 'ネイルサロン', summary: '子連れ歓迎のネイルサロン。DVD完備。' },
];

// イベントテンプレート
const eventTemplates = [
  { title: '親子リトミック体験会', summary: '0歳から参加できるリトミック体験。楽しく音楽に触れよう！' },
  { title: 'ベビーマッサージ講座', summary: '赤ちゃんとの触れ合いを楽しむベビーマッサージ。初心者歓迎。' },
  { title: '子育てママの交流会', summary: '同じ月齢のママ同士で情報交換。悩みを共有できる場です。' },
  { title: '絵本読み聞かせ会', summary: '図書館司書による絵本の読み聞かせ。手遊びも楽しめます。' },
  { title: '離乳食講座', summary: '栄養士が教える離乳食の作り方。試食あり。' },
  { title: '親子クッキング教室', summary: '親子で楽しくお菓子作り。持ち帰りできます。' },
  { title: 'キッズ英語体験レッスン', summary: '歌やゲームで楽しく英語に触れる体験レッスン。' },
  { title: '子ども向けプログラミング体験', summary: 'ブロックを使った簡単プログラミング。小学生対象。' },
  { title: 'ファミリーコンサート', summary: '0歳から入場OK！親子で楽しめるクラシックコンサート。' },
  { title: '親子ヨガ教室', summary: 'ママのリフレッシュにも。赤ちゃんと一緒にできるヨガ。' },
];

// ランダム選択ヘルパー
function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPickMultiple(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// 日付生成
function generateDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function generateFutureDate(daysFromNow) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

// サービスMarkdown生成
function generateServiceMarkdown(index, template, area) {
  const areaNames = {
    izumo: '出雲', taisha: '大社', hirata: '平田', hikawa: '斐川',
    sada: '佐田', taki: '多伎', koryo: '湖陵'
  };

  const title = `${areaNames[area]}${template.titleBase}${index > 0 ? ` ${index + 1}` : ''}`;
  const slug = `${area}-${template.subcategory}-${index + 1}`;
  const selectedTags = randomPickMultiple(tags, 2, 5);
  const selectedTargetAges = randomPickMultiple(targetAges, 1, 3);
  const isFeatured = Math.random() > 0.7;
  const daysAgo = Math.floor(Math.random() * 90);

  const content = `---
title: "${title}"
slug: "${slug}"
area: "${area}"
categories:
  - "${template.category}"
subcategories:
  - "${template.subcategory}"
tags:
${selectedTags.map(t => `  - "${t}"`).join('\n')}
targetAges:
${selectedTargetAges.map(a => `  - "${a}"`).join('\n')}
summary: "${template.summary}"
address: "島根県出雲市${areaNames[area]}町1-2-3"
access: "一畑電鉄${areaNames[area]}駅より徒歩10分"
phone: "0853-XX-XXXX"
website: "https://example.com/${slug}"
hours: "10:00〜18:00"
closedDays: "水曜日"
parking: "あり（10台）"
price: "入場無料"
images:
  - url: "https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(title)}"
    alt: "${title}の外観"
isFeatured: ${isFeatured}
updatedAt: "${generateDate(Math.floor(daysAgo / 2))}"
createdAt: "${generateDate(daysAgo)}"
---

## ${title}について

${template.summary}

### 施設の特徴

- 子連れに優しい環境
- スタッフが親切丁寧に対応
- 清潔で安心できる空間

### ご利用について

お気軽にお問い合わせください。
`;

  return { filename: `${slug}.md`, content };
}

// イベントMarkdown生成
function generateEventMarkdown(index, template) {
  const area = randomPick(areas);
  const category = randomPick(categories);
  const subcategory = randomPick(subcategoriesByCategory[category]);
  const areaNames = {
    izumo: '出雲', taisha: '大社', hirata: '平田', hikawa: '斐川',
    sada: '佐田', taki: '多伎', koryo: '湖陵'
  };

  const slug = `event-${index + 1}`;
  const selectedTags = randomPickMultiple(tags, 1, 3);
  const selectedTargetAges = randomPickMultiple(targetAges, 1, 2);
  const isFeatured = Math.random() > 0.8;
  const daysFromNow = Math.floor(Math.random() * 60) + 7;
  const daysAgo = Math.floor(Math.random() * 30);

  const content = `---
title: "${template.title}"
slug: "${slug}"
area: "${area}"
categories:
  - "${category}"
subcategories:
  - "${subcategory}"
tags:
${selectedTags.map(t => `  - "${t}"`).join('\n')}
targetAges:
${selectedTargetAges.map(a => `  - "${a}"`).join('\n')}
summary: "${template.summary}"
venue: "${areaNames[area]}市民センター"
startAt: "${generateFutureDate(daysFromNow)}"
endAt: "${generateFutureDate(daysFromNow)}"
fee: "${Math.random() > 0.5 ? '無料' : '500円'}"
reservationUrl: "https://example.com/reserve/${slug}"
organizer: "${areaNames[area]}子育て支援協会"
contact: "0853-XX-XXXX"
images:
  - url: "https://placehold.co/600x400/e2e8f0/475569?text=${encodeURIComponent(template.title)}"
    alt: "${template.title}のイメージ"
isFeatured: ${isFeatured}
updatedAt: "${generateDate(Math.floor(daysAgo / 2))}"
createdAt: "${generateDate(daysAgo)}"
---

## イベント概要

${template.summary}

### 参加方法

事前予約が必要です。お電話またはWebからお申し込みください。

### 持ち物

- 動きやすい服装
- 飲み物
- タオル

皆様のご参加をお待ちしております！
`;

  return { filename: `${slug}.md`, content };
}

// メイン処理
function main() {
  // ディレクトリ作成
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
  }
  if (!fs.existsSync(eventsDir)) {
    fs.mkdirSync(eventsDir, { recursive: true });
  }

  // 既存ファイルをクリア
  fs.readdirSync(servicesDir).forEach(file => {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(servicesDir, file));
    }
  });
  fs.readdirSync(eventsDir).forEach(file => {
    if (file.endsWith('.md')) {
      fs.unlinkSync(path.join(eventsDir, file));
    }
  });

  // サービス30件生成
  let serviceIndex = 0;
  const usedSlugs = new Set();

  while (serviceIndex < 30) {
    const template = serviceTemplates[serviceIndex % serviceTemplates.length];
    const area = areas[serviceIndex % areas.length];
    const { filename, content } = generateServiceMarkdown(
      Math.floor(serviceIndex / serviceTemplates.length),
      template,
      area
    );

    if (!usedSlugs.has(filename)) {
      usedSlugs.add(filename);
      fs.writeFileSync(path.join(servicesDir, filename), content, 'utf-8');
      serviceIndex++;
    }
  }

  console.log(`✅ ${serviceIndex}件のサービスデータを生成しました`);

  // イベント10件生成
  for (let i = 0; i < 10; i++) {
    const template = eventTemplates[i % eventTemplates.length];
    const { filename, content } = generateEventMarkdown(i, template);
    fs.writeFileSync(path.join(eventsDir, filename), content, 'utf-8');
  }

  console.log(`✅ 10件のイベントデータを生成しました`);
}

main();
