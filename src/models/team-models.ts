import { Schema, model } from 'mongoose';

export interface ITeamMember {
    _id: number;
    firstName: string;
    lastName: string;
    mainRole: string;
    email: string;
    secondaryRoles?: string[];
    memberSince: Date;
    picture: string;
  }
  
  const schema = new Schema<ITeamMember>({
    _id: { type: Number },
    firstName: { type: String, required: true },
    lastName:  { type: String, required: true },
    mainRole:  { type: String, required: true },
    email:  { type: String, required: true },
    secondaryRoles:  { type: [String] },
    memberSince:  { type: Date, required: true },
    picture:  { type: String, required: true },
  });

  export default model<ITeamMember>("Team", schema);
