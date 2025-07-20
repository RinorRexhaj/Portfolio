export interface Project {
  title: string;
  description: string;
  images?: MediaProps[];
  url?: string;
}

interface MediaProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
