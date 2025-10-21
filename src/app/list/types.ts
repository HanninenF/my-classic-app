export interface Root {
  total: number;
  page: number;
  limit: number;
  data: GlossaryItem[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  bulletPoints: string[];
  domain?: string;
  kind?: string;
  courses: Course[];
  weblinks: string[];
}

export interface Course {
  title: string;
  short_form: string;
  hve_credits: number;
  weblink: string;
}
