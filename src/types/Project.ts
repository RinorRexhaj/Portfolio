export interface Project {
  title: string;
  description: string;
  images?: MediaProps[];
}

interface MediaProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
