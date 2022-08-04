import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DISHES } from '../shared/dishes';

import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';

import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

import { baseUrl } from '../shared/baseUrl';



class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };

        // lấy dữ liệu từ json server để hiển thị khi nhận thành công
        fetch(baseUrl + 'dishes')
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ dishes: json });
            })


    }

    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    }

    render() {


        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
            );
        };

        return (
            <div className='Main'>
                <Header />

                <Switch>
                    <Route path='/home' component={HomePage} />

                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route exact path='/contactus' component={Contact} />

                    <Route path='/menu/:dishId' component={DishWithId} />

                    <Redirect to="/home" />
                </Switch>



                {/* <Menu dishes={this.state.dishes} onClick={(dishID) => this.onDishSelect(dishID)} />
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}

                <Footer />

            </div>
        );
    }


}

export default Main;
