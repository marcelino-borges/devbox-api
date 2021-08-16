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

class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
  
export default AppError;
  