
import { Request, Response } from "express";
import AppError, { INVALID_QUERY, NOT_CREATED, NO_PORTFOLIO, NO_TEAMMATES, PORTFOLIO_ALREADY_EXIST, TEAMMATE_NOT_FOUND } from "../errors/app-error";
import portfolio from "../models/portfolio-models";
import { IPortfolioItem } from "../models/portfolio-models";
import { PORTFOLIO_NOT_FOUND } from './../errors/app-error';

export const getAllJobs = async (_req: Request, res: Response, next: any) => {
    try {
        const found = await portfolio.find();

        if(found && found.length > 0)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(NO_PORTFOLIO));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const getJobByName = async (req: Request, res: Response, next: any) => {
    try {
        const nameSearched: string = req.params.name;

        if(!nameSearched)
            return res.status(400).json(new AppError(INVALID_QUERY));

        const jobsFound = await portfolio.find({ name: nameSearched });

        if(jobsFound && jobsFound.length > 0)
            return res.status(200).json(jobsFound);
        else
            return res.status(400).json(new AppError(PORTFOLIO_NOT_FOUND));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const getJobById = async (req: Request, res: Response, next: any) => {
    try {
        const idSearched = req.params.id as string;
        
        const jobFound = await portfolio.findOne({ _id: idSearched });

        if(jobFound)
            return res.status(200).json(jobFound);
        else
            return res.status(400).json(new AppError(PORTFOLIO_NOT_FOUND));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const createPortfolio = async (req: Request, res: Response, next: any) => {
    try {
        const newJob: IPortfolioItem = req.body;

        const docCreated = await portfolio.create(newJob);

        if(docCreated)
            return res.status(201).json(docCreated);
        else
            return res.status(400).json(new AppError(NOT_CREATED));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const updatePortfolio = async (req: Request, res: Response, next: any) => {
    try {
        const job: IPortfolioItem = req.body;

        const found = await portfolio.findOneAndReplace(
            { _id: job._id }, 
            job,
            { new: true } //Returns the updated json from database
        );

        if(found)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(PORTFOLIO_NOT_FOUND));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const deletePortfolio = async (req: Request, res: Response, next: any) => {
    try {
        const idSearched: string = req.query.id as string;
        const nameSearched: string = req.query.name as string;
        let found;

        if(idSearched)
            found = await portfolio.findOneAndDelete({ _id: idSearched });
        else if(nameSearched)
            found = await portfolio.findOneAndDelete({ name: nameSearched });

        if(found)
            return res.status(200).json();
        else
            return res.status(400).json(new AppError(PORTFOLIO_NOT_FOUND));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}