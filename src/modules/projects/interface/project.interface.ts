export interface IProject {
  id: number;
  img: string;
  title: string;
  desc: string;
  filenames: string[];
  address: string;
  contractPdf: string;
  created_at: string | null;
  updated_at: string | null;
}
