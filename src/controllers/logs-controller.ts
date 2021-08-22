import { Request, Response } from "express";
import * as logsService from './../services/logs-service';


export const getAllLogs = async (req: Request, res: Response, next: any) => {
    return logsService.getAllLogs(req, res, next);
}

export const getLogsByType = async (req: Request, res: Response, next: any) => {
    return logsService.getLogsByType(req, res, next);
}

export const createLog = (req: Request, res: Response, next: any) => {
    return logsService.createLog(req, res, next);
}

export const updateLog = (req: Request, res: Response, next: any) => {
    return logsService.updateLog(req, res, next);
}

export const deleteLog = (req: Request, res: Response, next: any) => {
    return logsService.deleteLog(req, res, next);
}
