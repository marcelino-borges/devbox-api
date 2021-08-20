import AppError from "../errors/app-error";
import { removeLocalFile } from "../utils/files-utils";
import { log } from "../utils/utils";

// Keeping require(), otherwise basicFtp var gets undefined with the ordinary ts import
const basicFtp = require("basic-ftp");

export const uploadFileToFTP = async (
    originFilePath: string, 
    destinyFilePath: string, 
    ensureFtpPath: boolean, 
    ftpPathToEnsure: string, 
    response: any
) => {
    let client: any;

    try {
        client = await connectFtp();
        client.ftp.verbose = true;

        if(ensureFtpPath) await client.ensureDir(ftpPathToEnsure);

        await client.uploadFrom(originFilePath, destinyFilePath).then((_: any) => {
            log("SUCCESS uploading file", "FROM: " 
                + originFilePath, 
                "TO: " + destinyFilePath);
            removeLocalFile(originFilePath);
            client.close();
            return response.status(200).json({ url: process.env.DEVBOX_DOMAIN + destinyFilePath.replace("/public_html", "") });
        }).catch((err: any) => {
            log("ERROR uploading file",
                "FROM: " + originFilePath,
                "TO: " + destinyFilePath,
                "Error: " + err);
            client.close();
            returnUploadError(err, originFilePath, response);
        });
    } catch (error: any) {
        if(!!client)
            client.close();
        returnUploadError(error, originFilePath, response);
    }
}

export const deleteFileFromFTPByPathAndFileName = async (
    remoteFilePath: string, 
    fileName: string, 
    response: any
) => {
    let client;

    try {
        client = await connectFtp();
        client.ftp.verbose = true;

        let path: string = "/public_html/storage/";
        
        if(remoteFilePath[0] !== "/")
            path += remoteFilePath;
        else
            path += remoteFilePath.substring(1, remoteFilePath.length - 1);

        if(path[path.length - 1] !== "/")
            path += "/";

        await client.remove(path + fileName).then((_: any) => {
            log("SUCCESS deleting file:", path + fileName);
            return response.status(200).json();
        }).catch((err: any) => {
            log("ERROR deleting file:", path + fileName, "ERROR: " + err);
            return response.status(400).json(new AppError(err.message, 400));
        });
    } catch (error: any) {
        if(!!client)
            client.close();
        return response.status(500).json(new AppError(error.message, 500));
    }
}

export const deleteFileFromFTPByCompletePath = async (
    completeFilePath: string,
    response: any
) => {
    let client;

    try {
        client = await connectFtp();
        client.ftp.verbose = true;

        let path: string = "/public_html/storage";

        path += completeFilePath[0] !== "/" ? "/" + completeFilePath : completeFilePath;

        await client.remove(path).then((_: any) => {
            log("SUCCESS deleting file:", completeFilePath);
            return response.status(200).json();
        }).catch((err: any) => {
            log("ERROR deleting file:", completeFilePath, "ERROR: " + err);
            return response.status(400).json(new AppError(err.message, 400));
        });
    } catch (error: any) {
        if(!!client)
            client.close();
        return response.status(500).json(new AppError(error.message, 500));
    }
}

export const deleteFileFromFTPByUrl = async (
    url: string,
    response: any
) => {
    let client;

    try {
        client = await connectFtp();
        client.ftp.verbose = true;

        let domainRemoved = url.replace(process.env.DEVBOX_DOMAIN as string, "");
        if(domainRemoved.includes("/storage")) domainRemoved = domainRemoved.replace("/storage", "");

        let path: string = "/public_html/storage";

        path += url;

        await client.remove(path).then((_: any) => {
            log("SUCCESS deleting file:", url);
            return response.status(200).json();
        }).catch((err: any) => {
            log("ERROR deleting file:", url, "ERROR: " + err);
            return response.status(400).json(new AppError(err.message, 400));
        });
    } catch (error: any) {
        if(!!client)
            client.close();
        return response.status(500).json(new AppError(error.message, 500));
    }
}

const connectFtp = async (): Promise<any> => {
    const client = new basicFtp.Client();
    await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD
    }).then((_: any) => log("Successfully connected to FTP."))
    .catch((error: any) => {
        client.close();
        log("Error connecting to FTP.");
        throw error;
    });
    return client;   
}

const returnUploadError = (error: Error, filePath: string, response: any) => {
    removeLocalFile(filePath);
    return response.status(500).json(new AppError(error.message, 500));
}