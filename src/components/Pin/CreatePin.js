// @flow

import React from 'react'
import {db} from '../../datalayer/firebase/index';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';


type State = {
    title: string,
    radius: string,
}

export type Props = {
    authUser: { uid: string },
    position: { lat: number, lng: number}
}

export default class CreatePin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: '',
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
            latitude: parseFloat(this.props.position.lat),
            longitude: parseFloat(this.props.position.lng),
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
                        name={'radius'}
                        onChange={this.handleInputChange}
                        hintText={'1'}
                        floatingLabelText="Radius in m"
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

