export interface Movie {
   id: string;
   name: string;
   type: "ACAO" | "COMEDIA" | "LUTA" | "DRAMA" | "TERROR" | "SUSPENSE";
   description: string;
}
