export interface Produto {
    id?:number | undefined;
    nome: string;
    fornecedor: string;
    codigo: string;
    categoria: number;
    visable?: string | undefined 
    list?: Produto[] | undefined
    erro?: string | undefined
    
}