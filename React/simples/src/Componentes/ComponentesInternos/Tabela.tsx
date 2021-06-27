import React, { Component } from 'react';
import '../style.css';
import { PropsTable } from '../../Interfaces/propsTable';
import { Fornecedor } from '../../Interfaces/Fornecedor';
import { Produto } from '../../Interfaces/Produto';

export default class Tabela extends Component <PropsTable>
{

    constructor(props:PropsTable) {
        super(props)
        this.listar=this.listar.bind(this);
    }

    listar()
    {
        let listagem:JSX.Element[]=[];

        if(this.props.tipo=="f")
        {
            let fornecedores: Fornecedor []=this.props.fornecedor;
            for(let i=0;i<fornecedores.length;i++)
            {
                let fornecedor=fornecedores[i];
                listagem[i]=<tr>
                            <th>{fornecedor.nome}</th>
                            <th>{fornecedor.cnpj}</th>
                            <th>{fornecedor.estado}</th>
                            <th>{fornecedor.totalProdutos}</th>
                            </tr>;
            }
        }else if(this.props.tipo=="p")
        {
            let produtos: Produto []=this.props.produto;
            for(let i=0;i<produtos.length;i++)
            {
                let fornecedor=produtos[i];
                listagem[i]=<tr>
                            <th>{fornecedor.nome}</th>
                            <th>{fornecedor.codigo}</th>
                            <th>{fornecedor.categoria}</th>
                            <th>{fornecedor.fornecedor}</th>
                            </tr>;
            }
        }
       return listagem;
    }

    render() 
    {
        return (
            <div>
            <table className="w100">
                <tr className="fundoCabecalhoTabela">
                    <th className="w25">{this.props.col1}</th>
                    <th className="w25">{this.props.col2}</th>
                    <th className="w25">{this.props.col3}</th>
                    <th className="w25">{this.props.col4}</th>
                </tr>
                {this.listar()}
            </table>
            </div>      
       )
    }
}