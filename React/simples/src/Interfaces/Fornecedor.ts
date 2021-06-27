export interface Fornecedor {
    id?:number | undefined;
    nome: string;
    cnpj: string;
    estado: string;
    totalProdutos: number;
    visable?: string | undefined 
    list?: Fornecedor[] | undefined
    erro?: string | undefined
    
}