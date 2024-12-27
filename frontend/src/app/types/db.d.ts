export type DbSectionType = {
  id: number;
  name: string;
  depth: number;
};

export type DbElementType = {
  id: number;
  name: string;
  translation: string;
  context: string;
  section_id: number;
  path?: string;
};
