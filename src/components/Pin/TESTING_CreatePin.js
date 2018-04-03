// @flow

import React from 'react'
import {db} from '../../backend/firebase/index';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

type State = {
    title: string,
    longitude: string,
    latitude: string,
    radius: string,
}

type Props = {
    authUser: { uid: string },
}

export class CreatePinForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
            longitude: '8.815886',
            latitude: '47.223946',
            radius: '',
        };
    }

    handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event: any) => {
        db.doCreatePin({
            authUser: this.props.authUser,
            title: this.state.title,
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            radius: parseFloat(this.state.radius)
        });
        alert('Pin sent to DB');
        event.preventDefault();
    };

    render() {
        return (
            <Card style={{
                width: '-moz-fit-content',
            }}>
                <CardTitle title='Create a pin for testing'/>
                <CardText>
                    <TextField
                        name={'title'}
                        onChange={this.handleInputChange}
                        hintText={'Rapperswil'}
                        floatingLabelText="Title"
                        value={this.state.title}
                    /><br/>
                    <TextField
                        name={'latitude'}
                        onChange={this.handleInputChange}
                        hintText={'47.223946'}
                        floatingLabelText="Latitude"
                        value={this.state.latitude}
                    /><br/>
                    <TextField
                        name={'longitude'}
                        onChange={this.handleInputChange}
                        hintText={'8.815886'}
                        floatingLabelText="Longitude"
                        value={this.state.longitude}
                    /><br/>
                    <TextField
                        name={'radius'}
                        onChange={this.handleInputChange}
                        hintText={'1'}
                        floatingLabelText="Radius in km"
                        value={this.state.radius}
                    /><br/>
                </CardText>
                <CardActions>
                    <FlatButton
                        onClick={this.handleSubmit}
                        label="Create"/>
                </CardActions>
            </Card>
        );
    }
}

