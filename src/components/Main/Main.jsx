import React from 'react'
import { Switch, Route } from 'react-router'
import AddBook from '../AddBook/AddBook'
import EditBook from '../EditBook/EditBook'
import Header from '../Header/Header'
import Login from '../Login/Login'
import MainPage from '../MainPage/MainPage'
import Registration from '../Registration/Registration'
import UserProfile from '../UserProfile/UserProfile'

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
        )
    // else{
    //     return(
    //         <>
    //             <Header/>
    //             <Switch>
    //                 <Route exact path="/" component={MainPage}/>
    //                 <Route exact path="/login" component={Login}/>
    //                 <Route exact path="/registration" component={Registration}/>
    //             </Switch>
    //         </>
    //     )
    // }
}

export default Main;