type ResponseStatus = "success" | "error";

export interface BaseResponse<T> {
    status: ResponseStatus;
    message: string | null;
    data: T | null;
}
