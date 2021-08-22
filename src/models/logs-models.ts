import { Schema, model } from 'mongoose';

export interface ILog {
  _id?: string;
  content?: string;
  error?: string;
  title: string;
  type: LogType;    
}

export enum LogType {
  ERROR,
  INFO,
  WARN
}

const schema = new Schema<ILog>({
  content:  { type: String },
  error:  { type: String },
  title: { type: String, required: true },
  type:  { type: LogType, required: true },
});

export default model<ILog>("Log", schema);
