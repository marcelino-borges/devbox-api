import { Request, Response } from "express";
import * as filesService from './../services/files-service';


export const uploadFile = async (req: Request, res: Response, next: any) => {
    return filesService.uploadFile(req, res, next);
}

export const deleteFile = async (req: Request, res: Response, next: any) => {
    return filesService.deleteFile(req, res, next);
}