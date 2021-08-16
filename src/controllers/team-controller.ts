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

export const getMemberByEmail = (req: Request, res: Response, next: any) => {
    return teamService.getMemberByEmail(req, res, next);
}

export const createTeammate = (req: Request, res: Response, next: any) => {
    return teamService.createTeammate(req, res, next);
}

export const updateTeammate = (req: Request, res: Response, next: any) => {
    return teamService.updateTeammate(req, res, next);
}

export const deleteTeammate = (req: Request, res: Response, next: any) => {
    return teamService.deleteTeammate(req, res, next);
}
