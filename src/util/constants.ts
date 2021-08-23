export const __PORT__: number = parseInt(process.env.PORT || "80");
export const __DB__: string = process.env.DB || "postgres://postgres:postgres@localhost:5432/postgres";
export const __TOKEN_KEY__: string = process.env.TOKEN_KEY || "unsubstantial";
