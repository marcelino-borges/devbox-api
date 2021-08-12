import { Request, Response } from "express";
import * as teamService from './../services/team-service';


export const getAllMembers = async (req: Request, res: Response) => {
    return teamService.getAllMembers(req, res);
}

export const getMemberById = (req: Request, res: Response) => {
    return teamService.getMemberById(req, res);
}

export const getMemberByName = (req: Request, res: Response) => {
    return teamService.getMemberByName(req, res);
}
