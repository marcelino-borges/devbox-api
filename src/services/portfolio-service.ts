
import { Request, Response } from "express";
import { IPortfolioItem } from "../models/portfolio";
import portfolioJSON  from "./../data/portfolio";

const portfolio: IPortfolioItem[] = portfolioJSON.map((item: any) => {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        highlightImg: item.highlightImg,
        imgs: item.imgs,
        storeUrl: item.storeUrl,
        otherUrls: item.otherUrls
    }
});

export const getAllJobs = async (_req: Request, res: Response) => {
    try {
        return res.status(200).json(portfolio);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export const getJobByName = (req: Request, res: Response) => {
    try {
        const nameSearched: string = req.params.name;

        let itemFound;

        portfolio.find(item => {
            if(item.name.toLowerCase().includes(nameSearched))
                itemFound = item;
        });

        if(itemFound)
            return res.status(200).json(itemFound);
        return res.status(400).json(null);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}

export const getJobById = (req: Request, res: Response) => {
    try {
        const idSearched = Number.parseInt(req.params.id, 10);
        let itemFound;

        portfolio.find(item => {
            if(item.id === idSearched)
                itemFound = item;                
        });

        if(itemFound)
            return res.status(200).json(itemFound);
        return res.status(400).json(null);
    } catch(e: any) {
        return res.status(500).json({ error: e.message });
    }
}