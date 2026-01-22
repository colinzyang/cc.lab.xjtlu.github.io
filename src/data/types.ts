// 人员数据类型
export interface Member {
  id: string;
  name: string;
  role: string;
  title?: string;
  image: string;
  bio?: string;
  bio_long?: string;
  interest?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  google_scholar?: string;
  orcid?: string;
  type: 'member' | 'alumn';
  current_position?: string;
}

// 论文数据类型
export interface Publication {
  id: number;
  title: string;
  journal: string;
  date: string;
  year: number;
  authors: string;
  link: string;
  doi?: string;
  preprint_url?: string;
  preprint_label?: string;
  image?: string;
}

// 新闻数据类型
export interface NewsItem {
  date: string;
  title: string;
  category: string;
  excerpt?: string;
}

// 联系信息类型
export interface ContactInfo {
  email: string;
  office: string;
  mapUrl?: string;
}
