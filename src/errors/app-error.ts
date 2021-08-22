export const INVALID_QUERY = "Invalid query.";

export const NOT_CREATED = "Not created.";
export const NOT_UPDATED = "Not updated.";
export const NOT_DELETED = "Not deleted.";

export const TEAMMATE_ALREADY_EXIST = "Teammate already exists.";
export const TEAMMATE_NOT_FOUND = "Teammate not found.";
export const NO_TEAMMATES = "No teammates found.";

export const PORTFOLIO_ALREADY_EXIST = "Portfolio already exists.";
export const PORTFOLIO_NOT_FOUND = "Portfolio not found.";
export const NO_PORTFOLIO = "No portfolio found.";

export const INVALID_FILE_UPLOADED = "The uploaded file is invalid (eg. 'undefined').";
export const MISSING_USER_EMAIL_SENDER = "The user email is missing from the form-data sent in the body of the request.";
export const MISSING_PARAMS_DELETE = "Parameter necessary for deletion is missing.";

export const NO_LOGS = "No logs found.";
export const MISSING_PARAM_TYPE = "Parameter 'type' is missing.";

class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
  
export default AppError;
  