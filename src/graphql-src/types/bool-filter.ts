export interface BoolFilter {
  equals?: string;
  not?: {
    equals: string;
  };
}
