interface MetadataType {
  id: string;
  href: string;
  title: string;
  description: string;
  date: string;
  edit: string;
}

interface HeadingType {
  title: string;
  id: string;
  depth: number;
}

export type { MetadataType, HeadingType };
