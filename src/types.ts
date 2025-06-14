export interface IAminoAcid {
  id: string;
  text: string;
  color: string | null;
}

export interface ISequences {
  id: string;
  first: IAminoAcid[];
  second: IAminoAcid[];
}

export interface IFormAlignSequences {
  first: string;
  second: string;
  generalErrors: string[];
}
