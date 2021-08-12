import { Request, Response } from "express";
import * as portfolioService from './../services/portfolio-service';


export const getAllJobs = async (req: Request, res: Response) => {
    return portfolioService.getAllJobs(req, res);
}

export const getJobById = (req: Request, res: Response) => {
    return portfolioService.getJobById(req, res);
}

export const getJobByName = (req: Request, res: Response) => {
    return portfolioService.getJobByName(req, res);
}
