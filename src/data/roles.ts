export interface Role {
  id: string;
  title: string;
  focus: string;
  companyType: string;
  description: string;
  icon: string;
}

export const roles: Role[] = [
  {
    id: 'technical-pm',
    title: 'Technical Product Manager',
    focus: 'Product + Technology',
    companyType: 'Fintech / Payments',
    description: 'I have already done this at PayLink.',
    icon: ''
  },
  {
    id: 'digital-strategist',
    title: 'Digital Product Strategist',
    focus: 'UX + Strategy + Business',
    companyType: 'Consulting / Inhouse',
    description: 'I translate complexity into business value.',
    icon: ''
  },
  {
    id: 'innovation-lead',
    title: 'Innovation Lead',
    focus: 'New Digital Solutions',
    companyType: 'AI / Data / PropTech',
    description: 'I think future, build new and see the whole picture.',
    icon: ''
  }
];
