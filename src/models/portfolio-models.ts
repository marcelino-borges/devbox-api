import { Schema, model } from 'mongoose';

export interface IPortfolioItem {
  _id?: number;
  name: string;
  description: string;
  highlightImg: string;
  imgs: string[];
  storeUrl: string;
  otherUrls: {
    name: string;
    url: string;
  }[]
}

const schema = new Schema<IPortfolioItem>({
  _id: { type: Number },
  name: { type: String, required: true },
  description: { type: String, required: true },
  highlightImg: { type: String, required: true },
  imgs: { type: [String], required: true },
  storeUrl: { type: String, required: true },
  otherUrls: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
  }],  
});

export default model<IPortfolioItem>("Portfolio", schema);