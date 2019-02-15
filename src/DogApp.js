import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getPictures, choosePicture } from "./store/pictures/actions";
import { Form, InputNumber } from "antd";

import bgimg from "./assets/background.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';

const BackgroundImage = styled.img`
  position: fixed;
  top: 0px;
  left: 0px;
  min-width: 100%;
  min-height: 100%;
`;

class DogApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            total_pics: 10,
            n_per_time: 2,
            game_ended: false,
        };
    }

    static propTypes = {
        getPictures: PropTypes.func.isRequired,
        choosePicture: PropTypes.func.isRequired,
    }

    // getPictures(n){
    //     const url = API + `count=${n}`;
    //     axios.get(url)
    //     .then((response) => {
    //         var pictures = response.data.slice();
    //         if (this.state.winner){
    //             pictures.push(this.state.winner);
    //         }
    //         this.setState((state, props) => ({
    //             pictures: pictures,
    //             n_shown: state.n_shown + response.data.length,
    //         }));
    //     })
    //     .catch((error) => {
    //         // handle error
    //         console.log(error);
    //     });
    // };

    componentDidMount(){
        this.props.getPictures(this.state.n_per_time);
    }

    setWinner(url){
        this.setState({
            winner: url
        });
    }

    selectWinnder(url){
        // this.setWinner(url);
        this.props.choosePicture(url);
        if (this.props.n_shown < this.state.total_pics){
            this.props.getPictures(this.state.n_per_time - 1);
        } else {
            this.setState({
                game_ended: true,
            })
        }
    }

    render(){
        return (
            <div>
                <BackgroundImage src={bgimg} />
                <h1>Who has the cuteeeeest dog?</h1>
                <p>How many pictures to show at a time?</p>
                {/* <IntegerSlider min={2} max={4} default={2} 
                    onChange={(value) => this.setState({n_per_time: value})}
                /> */}
                
                <Form>
                    <Form.Item label="Dogs per Contest">
                        <InputNumber min={2} max={4} defaultValue={2} 
                            onChange={(value) => this.setState({n_per_time: value})}
                        />
                    </Form.Item>
                    <Form.Item label="Total Contestants">
                        <InputNumber min={10} max={100} defaultValue={10} 
                            onChange={(value) => this.setState({total_pics: value})}
                        />
                    </Form.Item>
                </Form>
            
                { 
                    this.state.game_ended ?
                        <div className="winner">
                            <h2>Final Winner is HERE!</h2>
                            <img 
                                src={this.props.winner} 
                                alt="Winner"
                                width="450" 
                                height="450" 
                            />
                        </div>
                    :
                        <div className="d-flex justify-content-between pictures">
                            {
                                this.props.showing.map(pic => 
                                    <div 
                                        key={pic} 
                                        onClick={e => this.selectWinnder(pic)}
                                        className="d-flex align-items-center h100 m-r-1"
                                    >
                                        <img 
                                            src={pic} 
                                            alt="Dog" 
                                            width="280" 
                                            height="280" 
                                        />
                                    </div>
                                )
                            }
                        </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.Pictures,
});

const mapDispatchToProps = {
    getPictures,
    choosePicture,
}

export default connect(mapStateToProps, mapDispatchToProps)(DogApp);



// const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);