
import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import AppError, {
    INVALID_FILE_UPLOADED, 
    MISSING_PARAMS_DELETE, 
    MISSING_USER_EMAIL_SENDER 
} from "../errors/app-error";
import { TEMP_LOCAL_PATH_ON_UPLOAD } from "../utils/files-utils";
import { 
    deleteFileFromFTPByPathAndFileName,
    deleteFileFromFTPByCompletePath,
    uploadFileToFTP 
} from "./ftp-service";
import { replaceAllSpacesByUnderlines } from "../utils/utils";

/*// Model of a file object: req.file
    {
        fieldname: 'img', // Nome precisa bater com o nome passado no upload.single("img") em files.routes.ts
        originalname: '3333.PNG',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './public/uploads/img',
        filename: '5510ae785a4337b157a7d0555d5663cb',
        path: 'public\\uploads\\img\\5510ae785a4337b157a7d0555d5663cb',
        size: 263574
    }
*/

export const uploadFile = async (req: Request, res: Response, next: any) => {
    try {
        if(!req.file) 
            return res.status(400).json(new AppError(INVALID_FILE_UPLOADED, 400));

        if(!!req.body && !req.body.userSenderName && req.body.userSenderName.length === 0)
            return res.status(400).json(new AppError(MISSING_USER_EMAIL_SENDER, 400));

        const userName: string = replaceAllSpacesByUnderlines(req.body.userSenderName as string);

        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const ftpPath = `/public_html/storage/${year}/${month}/${day}/${userName}`;

        const originFilePath = TEMP_LOCAL_PATH_ON_UPLOAD + "/" + req.file?.filename;
        const destinyFilePath = ftpPath + "/" + req.file?.filename;

        uploadFileToFTP(
            originFilePath, 
            destinyFilePath, 
            true, 
            ftpPath, 
            res
        );
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}

export const deleteFile = async (req: Request, res: Response, next: any) => {
    try {
        const completePath: string = req.query.completePath as string;
        const path: string = req.query.path as string;
        const fileName: string = req.query.fileName as string;

        if(!!completePath) {
            deleteFileFromFTPByCompletePath(completePath, res);
        } else {
            if(!path || !fileName)
                return res.status(400).json(new AppError(MISSING_PARAMS_DELETE, 400));

            deleteFileFromFTPByPathAndFileName(path, fileName, res);
        }
    } catch(e: any) {
        return res.status(500).json(new AppError(e.message, 500));
    }
}