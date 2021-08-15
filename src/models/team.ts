export interface ITeamMember {
    id: number;
    firstName: string;
    lastName: string;
    mainRole: string;
    email: string;
    secondaryRoles: string[];
    memberSince: Date;
    picture: string;
  }
  