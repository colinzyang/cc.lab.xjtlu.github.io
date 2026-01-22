import { ContactInfo } from './types';

export const CONTACT: ContactInfo = {
  email: 'Chun.Chan@xjtlu.edu.cn',
  office: 'Office 463, Science Building, SIP',
  // Google Maps Embed API URL - 需要使用 embed 格式而不是短链接
  // 这是 XJTLU Science Building 的位置
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.935!2d120.7415!3d31.2965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b3c1c1c1c1c1c1%3A0x1c1c1c1c1c1c1c1c!2sXi\'an%20Jiaotong-Liverpool%20University!5e0!3m2!1sen!2scn!4v1234567890'
};

export const LAB_INFO = {
  name: 'CC Lab',
  fullName: 'CC Lab @ XJTLU',
  tagline: 'Structural Bioinformatics & Molecular Dynamics',
  description: 'Our lab combines structural bioinformatics, molecular dynamics simulations, and machine learning methods to investigate protein structure-function relationships and develop computational tools for drug discovery.',
  affiliation: 'Xi\'an Jiaotong-Liverpool University (XJTLU)',
  department: 'School of Science',
  centers: [
    {
      name: 'Center for Intelligent RNA Therapeutics',
      url: 'https://www.xjtlu.edu.cn/en/research/research-centres-and-institutes'
    }
  ]
};
