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

export const createPortfolio = (req: Request, res: Response, next: any) => {
    return portfolioService.createPortfolio(req, res, next);
}

export const updatePortfolio = (req: Request, res: Response, next: any) => {
    return portfolioService.updatePortfolio(req, res, next);
}

export const deletePortfolio = (req: Request, res: Response, next: any) => {
    return portfolioService.deletePortfolio(req, res, next);
}
