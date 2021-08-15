import { Request, Response } from "express";
import { ITeamMember } from './../models/team';
import teamJSON from "./../data/team";

const team: ITeamMember[] = teamJSON.map((item: any) => {
    return {
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        mainRole: item.mainRole,
        email: item.email,
        secondaryRoles: item.secondaryRoles,
        memberSince: new Date(item.memberSince),
        picture: item.picture,
    }
});

export const getAllMembers = async (_req: Request, res: Response, next: any) => {
    try {
        return res.status(200).json(team);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export const getMemberByName = (req: Request, res: Response, next: any) => {
    try {
        const firstNameSearched: string = req.query.firstName as string;
        const lastNameSearched: string = req.query.lastName as string;

        if(!firstNameSearched || !lastNameSearched)
            return res.status(400).json(null);

        let memberFound;

        team.find(member => {
            if(member.firstName.toLowerCase().includes(firstNameSearched.toLowerCase()) &&
                member.lastName.toLowerCase().includes(lastNameSearched.toLowerCase()))
                memberFound = member;
        });

        if(memberFound)
            return res.status(200).json(memberFound);
        return res.status(400).json(null);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export const getMemberById = (req: Request, res: Response, next: any) => {
    try {
        const idSearched = Number.parseInt(req.params.id, 10);
        let memberFound;

        team.find(member => {
            if(member.id === idSearched)
                memberFound = member;                
        });

        if(memberFound)
            return res.status(200).json(memberFound);
        return res.status(400).json(null);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export const getMemberByEmail = (req: Request, res: Response, next: any) => {
    try {
        let memberFound;

        team.find(member => {
            if(member.email === req.params.email)
                memberFound = member;                
        });

        if(memberFound)
            return res.status(200).json(memberFound);
        return res.status(400).json(null);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}