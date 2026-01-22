import { Publication } from './types';

// 根据年份分组的论文数据
export const PUBLICATIONS_BY_YEAR: { year: number; papers: Publication[] }[] = [
  {
    year: 2024,
    papers: [
      {
        id: 1,
        title: 'Deep Learning for Drug-Target Interaction Prediction: A Comprehensive Review',
        journal: 'Nature Machine Intelligence',
        date: '2024 Jan',
        year: 2024,
        authors: 'Doe J, Smith A, Johnson B',
        link: 'https://doi.org/10.1038/s42256-024-00001',
        doi: '10.1038/s42256-024-00001',
        preprint_url: 'https://arxiv.org/abs/2023.12345',
        preprint_label: 'arXiv',
        image: 'paper1.jpg'
      }
    ]
  },
  {
    year: 2023,
    papers: [
      {
        id: 2,
        title: 'Single-Cell RNA Sequencing Reveals Novel Cell Types in Disease',
        journal: 'Cell',
        date: '2023 Dec',
        year: 2023,
        authors: 'Smith A, Wong A, Doe J',
        link: 'https://doi.org/10.1016/j.cell.2023.11.001',
        doi: '10.1016/j.cell.2023.11.001',
        preprint_url: 'https://www.biorxiv.org/content/10.1101/2023.09.001',
        preprint_label: 'bioRxiv',
        image: 'paper2.jpg'
      },
      {
        id: 3,
        title: 'Graph Neural Networks for Molecular Property Prediction',
        journal: 'Journal of Chemical Information and Modeling',
        date: '2023 Nov',
        year: 2023,
        authors: 'Johnson B, Brown M, Doe J',
        link: 'https://doi.org/10.1021/acs.jcim.3c00001',
        doi: '10.1021/acs.jcim.3c00001',
        image: 'paper3.jpg'
      },
      {
        id: 4,
        title: 'Interpretable Machine Learning for Genomics',
        journal: 'Nature Methods',
        date: '2023 Oct',
        year: 2023,
        authors: 'Wong A, Doe J',
        link: 'https://doi.org/10.1038/s41592-023-02001',
        doi: '10.1038/s41592-023-02001',
        preprint_url: 'https://www.biorxiv.org/content/10.1101/2023.08.001',
        preprint_label: 'bioRxiv',
        image: 'paper4.jpg'
      },
      {
        id: 5,
        title: 'Multi-omics Integration Using Deep Learning',
        journal: 'Bioinformatics',
        date: '2023 Sep',
        year: 2023,
        authors: 'Brown M, Smith A, Johnson B, Doe J',
        link: 'https://doi.org/10.1093/bioinformatics/btad501',
        doi: '10.1093/bioinformatics/btad501',
        image: 'paper5.jpg'
      }
    ]
  }
];

// 扁平化的所有论文列表
export const ALL_PUBLICATIONS: Publication[] = PUBLICATIONS_BY_YEAR.flatMap(
  group => group.papers
);
