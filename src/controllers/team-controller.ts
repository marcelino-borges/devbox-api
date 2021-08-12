import { Request, Response } from "express";
import * as teamService from './../services/team-service';


export const getAllMembers = async (req: Request, res: Response, next: any) => {
    return teamService.getAllMembers(req, res, next);
}

export const getMemberById = (req: Request, res: Response, next: any) => {
    return teamService.getMemberById(req, res, next);
}

export const getMemberByName = (req: Request, res: Response, next: any) => {
    return teamService.getMemberByName(req, res, next);
}
