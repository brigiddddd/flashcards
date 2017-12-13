import { Stack } from './stack';

export class Category {
  id: number;
  name: string;
  backgroundColor: string;
  fontColor: string;
  stacks: Stack[] = [];
}
