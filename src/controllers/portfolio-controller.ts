import { Request, Response } from "express";
import * as portfolioService from './../services/portfolio-service';


export const getAllJobs = async (req: Request, res: Response, next: any) => {
    return portfolioService.getAllJobs(req, res, next);
}

export const getJobById = (req: Request, res: Response, next: any) => {
    return portfolioService.getJobById(req, res, next);
}

export const getJobByName = (req: Request, res: Response, next: any) => {
    return portfolioService.getJobByName(req, res, next);
}
