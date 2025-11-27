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

interface ImageType {
  url: string;
  violence: number;
  sexual: number;
  dims: number[];
}

interface DeveloperType {
  id: string;
  name: string;
  original: string | null;
}

interface VNType {
  title: string;
  alttitle: string;
  image: ImageType | null;
  description: string | null;
  released: string | null;
  developers: DeveloperType[] | null;
}

interface ResultType {
  id: string;
  vn: VNType;
  vote: number | null;
}

interface VNDBType {
  results: ResultType[];
}

interface CommentType {
  id: string;
  post_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
}

interface UserType {
  id: string;
  username: string;
  password: string;
}

export type { MetadataType, HeadingType, VNDBType, CommentType, UserType };
