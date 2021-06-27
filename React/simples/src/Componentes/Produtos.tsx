import React, { Component } from 'react';
import './style.css';
import Tabela from "./ComponentesInternos/Tabela";
import { Produto } from '../Interfaces/Produto';
import api from '../Services/API';
import { Fornecedor } from '../Interfaces/Fornecedor';

export default class Produtos extends Component 
{

    constructor(props:any) {
        super(props)
        this.abrirCadastro=this.abrirCadastro.bind(this);
        this.updateNome=this.updateNome.bind(this);
        this.updateCategoria=this.updateCategoria.bind(this);
        this.updateCodigo=this.updateCodigo.bind(this);
        this.updateCNPJ=this.updateCNPJ.bind(this); 
        this.cadastrar=this.cadastrar.bind(this);
        this.puxarProduto=this.puxarProduto.bind(this);
        this.puxarProduto();
    }
    produtos: Produto[]=[];
    fornecedor: Fornecedor[]=[];

    state=
    {
        visivel:"inVisivel",
        nome:"",
        cnpj:"",
        categoria:"",
        codigo:"",
        produto: this.produtos,
        erro:"",
    }

    updateNome(e:any)
    {
        this.setState({nome:e.target.value});
    }

    updateCNPJ(e:any)
    {
        this.setState({cnpj:e.target.value});
    }

    updateCategoria(e:any)
    {
        this.setState({categoria:e.target.value});
    }

    updateCodigo(e:any)
    {
        this.setState({codigo:e.target.value});
    }


    abrirCadastro()
    {
        if(this.state.visivel=="telaCadastro")
        {
            this.state.visivel="inVisivel";
         
        }else if(this.state.visivel=="inVisivel")
        {
            this.state.visivel="telaCadastro";
        }        
        this.setState(this.state);
    }

    cadastrar()
    {
        if(this.state.cnpj.length==14){
            if(this.state.codigo.length==13){
                if(this.state.nome.length>=1 && this.state.nome.length<=10){
                    if(this.state.categoria.length>=1 && this.state.categoria.length<=8){
                        const post = {
                            nome: this.state.nome,
                            cnpj: this.state.cnpj,
                            codigo: this.state.codigo,
                            categoria:this.state.categoria
                        }
                        //api.post("cadastrarFornecedor", post).then(resposta=>console.log(resposta.data));
                        api.post("cadastrarProduto", post).then(resposta=> this.setState({erro:resposta.data.erro}));
                        this.puxarProduto();
                        
                    }else
                    {
                        this.setState({erro:"Categoria tem que ter pelo menos 1 digito e no máximo 8."});
                    }
                }else
                {
                    this.setState({erro:"Nome tem que ter pelo menos 1 digito e no máximo 10."});
                }
            }else
            {
                this.setState({erro:"Código tem que ter 13 digitos."});
            }
        }else
        {
            this.setState({erro:"CNPJ tem que ter 14 digitos."});
        }
    }

    puxarProduto()
    {
        api.post("puxarProdutos").then(resposta=>this.setState({produto:resposta.data.produtos,erro:"",visivel:"inVisivel"}));
    }

    render() 
    {
        this.produtos=this.state.produto;      
        return (
            <React.Fragment>
                  <div className="centralizar">               
                    <span className="titulo">Produtos</span> <a onClick={e=>this.abrirCadastro()} className="buttonTitulo">Cadastrar Produto</a>
                    <div className="limpar" />                     
               
                 </div>
                <div className="centralizar">  
                    <Tabela col1="Nome" col2="Código" col3="Categoria" col4="Fornecedor" produto={this.state.produto} fornecedor={this.fornecedor} tipo="p"/> 
                </div>
                <div className={this.state.visivel}>
                    <div className="Centralizar">
                     <span className="tituloCadastro">Cadastrar Produto</span> <br/>
                     <span>Nome:</span>
                     <input onChange={e=>this.updateNome(e)} />
                     <span>Fornecedor:</span>
                     <input onChange={e=>this.updateCNPJ(e)} />
                     <span>Código:</span>
                     <input onChange={e=>this.updateCodigo(e)} />
                     <span>Categoria:</span>
                     <input onChange={e=>this.updateCategoria(e)} />
                     <a className="butaoCadastro" onClick={e=>this.cadastrar()}>Cadastrar</a>
                     <a className="butaoCadastro" onClick={e=>this.puxarProduto()}>Cancelar</a>
                     <span className="erro">{this.state.erro}</span>
                    </div>
                  
                </div>
            </React.Fragment>
               
            
       )
    }
}