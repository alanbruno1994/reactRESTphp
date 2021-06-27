import React, { Component } from 'react';
import './style.css';
import Menu from "./Menu"
import Rotas from './Rotas';
import { BrowserRouter } from 'react-router-dom';

export default class Dashboard extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
            <React.Fragment>
                <Menu />
                <Rotas/>
            </React.Fragment>
            </BrowserRouter>     
       )
    }
}