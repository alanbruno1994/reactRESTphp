import { Fornecedor} from './Fornecedor';
import { Produto } from './Produto';
export interface PropsTable {
    col1: string;
    col2: string;
    col3: string;
    col4: string;   
    tipo:string;
    fornecedor: Fornecedor[];
    produto:Produto[];

}