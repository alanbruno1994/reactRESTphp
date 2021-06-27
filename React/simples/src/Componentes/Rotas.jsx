import Produtos from './Produtos';
import Fornecedores from './Fornecedores';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';


export default props => 
    <Switch>       
        <Route path='/Fornecedores' component={Fornecedores} />
        <Route path='/Produtos' component={Produtos} />
        <Redirect from='*' to='/' />
    </Switch>