import { Sort } from '@api/filters/ISort';
import { Filter } from '@api/filters/IFilter';

export interface Query {
  filters?: Filter[];
  sort?: Sort[];
  relations?: string[];
}
