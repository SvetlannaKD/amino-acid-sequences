export interface ISequences {
  first: string;
  second: string;
}

export interface IFormAlignSequences extends ISequences {
  generalErrors: string[];
}
