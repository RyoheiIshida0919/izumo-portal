export const SITE_NAME = 'いずも子育てナビ';
export const SITE_DESCRIPTION =
  '島根県出雲市の子育て家庭向け地域ポータルサイト。子連れで行けるカフェ、習い事、病院、公園など、出雲市の子育て情報を検索できます。';
export const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://izumo-kosodate.example.com';

export const CONTACT_FORM_URL =
  import.meta.env.PUBLIC_CONTACT_FORM_URL || 'https://forms.google.com/example';
export const LINE_URL = import.meta.env.PUBLIC_LINE_URL || 'https://line.me/R/ti/p/@example';
export const BUSINESS_FORM_URL =
  import.meta.env.PUBLIC_BUSINESS_FORM_URL || 'https://forms.google.com/business-example';

export const NAV_ITEMS = [
  { href: '/', label: 'ホーム' },
  { href: '/services', label: 'サービス検索' },
  { href: '/events', label: 'イベント' },
  { href: '/columns', label: 'コラム' },
  { href: '/areas', label: 'エリアから探す' },
  { href: '/categories', label: 'カテゴリから探す' },
];

export const FOOTER_NAV = [
  { href: '/about', label: 'このサイトについて' },
  { href: '/howto', label: '使い方' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/media', label: '掲載希望' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/terms', label: '利用規約' },
  { href: '/site-map', label: 'サイトマップ' },
];

export const DUMMY_IMAGE_URL = 'https://placehold.co/600x400/e2e8f0/475569?text=No+Image';
