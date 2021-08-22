import { Request, Response } from "express";
import omit from "lodash.omit";
import logs, { LogType } from '../models/logs-models';
import AppError, { MISSING_PARAM_TYPE, NOT_CREATED, NO_LOGS, NO_TEAMMATES, TEAMMATE_ALREADY_EXIST, TEAMMATE_NOT_FOUND } from '../errors/app-error';
import { ILog } from './../models/logs-models';

export const getAllLogs = async (req: Request, res: Response, next: any) => {
    try {
        const found = await logs.find();
        if(found && found.length > 0)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(NO_LOGS));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const getLogsByType = async (req: Request, res: Response, next: any) => {
    try {
        const typeSearched: any = req.params.type;

        if(!typeSearched)
            return res.status(400).json(new AppError(MISSING_PARAM_TYPE));

        const found = await logs.find({ type: typeSearched });

        if(found && found.length > 0)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(NO_LOGS));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const createLog = async (req: Request, res: Response, next: any) => {
    try {
        const newLog: ILog = req.body;

        const docCreated = await logs.create(newLog);

        if(docCreated)
            return res.status(201).json(newLog);
        else
            return res.status(400).json(new AppError(NOT_CREATED));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const updateLog = async (req: Request, res: Response, next: any) => {
    try {
        const log: ILog = req.body;
        const withoutId = omit(log, "_id");
        const found = await logs.findOneAndReplace(
            { _id: log._id },
            withoutId,
            { new: true } //Returns the updated json from database
        );

        if(found)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(NO_LOGS));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const deleteLog = async (req: Request, res: Response, next: any) => {
    try {
        const idSearched: string | undefined = req.query.id as string;
        let found;

        if(idSearched)
            found = await logs.findOneAndDelete({ _id: idSearched });

        if(found)
            return res.status(200).json(found);
        else
            return res.status(400).json(new AppError(NO_LOGS));
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}