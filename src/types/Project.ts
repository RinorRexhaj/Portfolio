export interface Project {
  title: string;
  description: string;
  images?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}
