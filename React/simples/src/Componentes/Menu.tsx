import React, { Component } from 'react';
import './style.css';

export default class Menu extends Component {


    render() 
    {
        return (
         <div className="topMenu">
             <div className="itensMenu">
                 <a href="/Fornecedores">Fornecedores</a>
                 <a href="/Produtos">Produtos</a>                 
            </div>
            <div className="limpar"></div>
        </div>)
    }

}
