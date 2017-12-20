export class Stack {
  id: number;
  name: string;
  categoryId: number;
  backgroundColor?: string;
  fontColor?: string;
  cards: string[];

  constructor(options: IStackOptions) {
    this.id = options.id;
    this.name = options.name;
    this.categoryId = options.categoryId;
    this.backgroundColor = options.backgroundColor;
    this.fontColor = options.fontColor;
    this.cards = options.cards; // TODO: DEEP COPY?
  }
}

interface IStackOptions {
  id?: number;
  name?: string;
  categoryId?: number;
  cards?: string[];
  backgroundColor?: string;
  fontColor?: string;
}

interface IDisplayStackOptions extends IStackOptions {
  backgroundColor?: string;
  fontColor?: string;
  categoryName?: string;
  selected?: boolean;
}

export class DisplayStack extends Stack {
  categoryName: string;
  selected: boolean;
  backgroundColor: string;
  fontColor: string;

  constructor(options: IDisplayStackOptions) {
    super(options);
    this.selected = options.selected || false;
    this.categoryName = options.categoryName;
  }
}
