import React, { Component } from 'react'
import { Media } from 'reactstrap'
import { Card, CardImg, CarImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'
import Dish from '../components/DishdetailComponent'

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish){
        this.setState({ selectedDish: dish})
    }

    renderDish(dish){
        if( dish != null){
            return(
                <Card>
                    <CardImg witdh="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                    </CardBody>
                </Card>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

    render() {
        // Media from reactstrap
        /*const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 mt-5">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={dish.image} alt={dish.name}>
                            </Media>
                            <Media body className="ml-5">
                                <Media heading>
                                    {dish.name}
                                </Media>
                                <p>{dish.description}</p>
                            </Media>
                        </Media>
                    </Media>
                </div>
            )
        })
        */
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                            <CardImg witdh="100%" src={dish.image} alt={dish.name}></CardImg>
                            <CarImgOverlay>
                                <CardTitle>
                                    {dish.name}
                                </CardTitle>
                                <p>{dish.description}</p>
                            </CarImgOverlay>
                    </Card>
                </div>
            )
        })
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        )
    }
}

export default Menu