import React from 'react';
import { Switch, Route } from 'react-router';
import AddBook from '../AddBook/AddBook';
import EditBook from '../EditBook/EditBook';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';

const Main = () => {

        return(
            <>
                <Header/>
                <Switch>
                    <Route exact path="/" component={MainPage}/>
                    <Route exact path="/editbook/:id" component={EditBook}/>
                    <Route exact path="/addbook" component={AddBook}/>
                </Switch>
            </>
        );
}

export default Main;