import { Schema, model } from 'mongoose';

export interface IPortfolioItem {
  _id?: string;
  name: string;
  description: string;
  highlightImg: string;
  imgs: string[];
  storeUrl: string;
  otherUrls?: string[];
}

const schema = new Schema<IPortfolioItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  highlightImg: { type: String, required: true },
  imgs: { type: [String], required: true },
  storeUrl: { type: String, required: true },
  otherUrls: { type: [String] },
});

export default model<IPortfolioItem>("Portfolio", schema);