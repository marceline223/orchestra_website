export interface Filter {
  key: string;
  value: string | number | boolean | Array<string | number>;
  condition: string;
}
