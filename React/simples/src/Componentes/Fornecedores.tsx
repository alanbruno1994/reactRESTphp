import React, { Component } from 'react';
import './style.css';
import Tabela from "./ComponentesInternos/Tabela";
import { Fornecedor } from '../Interfaces/Fornecedor';
import api from '../Services/API';
import { Produto } from '../Interfaces/Produto';

export default class Fornecedores extends Component 
{

    constructor(props:any) {
        super(props)
        this.abrirCadastro=this.abrirCadastro.bind(this);
        this.updateNome=this.updateNome.bind(this);
        this.updateEstado=this.updateEstado.bind(this);
        this.updateCNPJ=this.updateCNPJ.bind(this); 
        this.cadastrar=this.cadastrar.bind(this);
        this.puxarFornecedor=this.puxarFornecedor.bind(this);
        this.puxarFornecedor();
    }
    fornecedores: Fornecedor[]=[];
    produto: Produto[]=[];

    state=
    {
        visivel:"inVisivel",
        nome:"",
        cnpj:"",
        estado:"",
        fornecedor: this.fornecedores,
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

    updateEstado(e:any)
    {
        this.setState({estado:e.target.value});
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
        const post = {
            nome: this.state.nome,
            cnpj: this.state.cnpj,
            estado: this.state.estado
        }
        //api.post("cadastrarFornecedor", post).then(resposta=>console.log(resposta.data));
        if(this.state.cnpj.length==14){
            if(this.state.estado.length>=3 && this.state.nome.length<=14){
                if(this.state.nome.length>=1 && this.state.nome.length<=10){                   
                    api.post("cadastrarFornecedor", post).then(resposta=> this.setState({erro:resposta.data.erro}));  
                    this.puxarFornecedor();
                 
                }else
                {
                    this.setState({erro:"Nome tem que ter pelo menos 1 digito e no máximo 10."});
                }
            }else
            {
                this.setState({erro:"Estado tem que ter 3 digitos e no máximo 14."});
            }
        }else
        {
            this.setState({erro:"CNPJ tem que ter 14 digitos."});
        }


        
    }

    puxarFornecedor()
    {
        
        //api.post("puxarFornecedores").then(resposta=>console.log(resposta.data.fornecedores));
        api.post("puxarFornecedores").then(resposta=>this.setState({fornecedor:resposta.data.fornecedores,visivel:"inVisivel"}));
    }

    render() 
    {
        this.fornecedores=this.state.fornecedor;      
        return (
            <React.Fragment>
                  <div className="centralizar">               
                    <span className="titulo">Fornecedores</span> <a onClick={e=>this.abrirCadastro()} className="buttonTitulo">Cadastrar Fornecedor</a>
                    <div className="limpar" />                     
               
                 </div>
                <div className="centralizar">  
                    <Tabela col1="Nome" col2="CNPJ" col3="Estado" col4="Total de produtos" fornecedor={this.fornecedores} produto={this.produto} tipo="f"/> 
                </div>
                <div className={this.state.visivel}>
                    <div className="Centralizar">
                     <span className="tituloCadastro">Cadastrar Fornecedor</span> <br/>
                     <span>Nome:</span>
                     <input onChange={e=>this.updateNome(e)} />
                     <span>CNPJ:</span>
                     <input onChange={e=>this.updateCNPJ(e)} />
                     <span>Estado:</span>
                     <input onChange={e=>this.updateEstado(e)} />
                     <a className="butaoCadastro" onClick={e=>this.cadastrar()}>Cadastrar</a>
                     <a className="butaoCadastro" onClick={e=>this.puxarFornecedor()}>Cancelar</a>
                     <span className="erro">{this.state.erro}</span>
                    </div>
                  
                </div>
            </React.Fragment>
               
            
       )
    }
}