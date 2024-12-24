export type DbSectionType = {
  id: number;
  depth: number;
  name: string;
};

export type DbElementType = {
  id: number;
  name: string;
  translation: string;
  context: string;
  section_id: number;
};
