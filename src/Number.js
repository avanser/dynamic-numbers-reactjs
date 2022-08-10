import React from 'react';

class Number extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingCode: 5,
            isDefault: true,
            text: props.text ? props.text : (props.number ? props.number : 'N/A'),
            number: props.number ? props.number : (props.text ? props.text : 'N/A'),
            type: props.type || false
        };
    }
    render() {
        let text = this.state.text
        let link = `tel://${this.state.text}`
        if (this.state.type === 'header') {
            return (<h3>Call us: <a href={link}>{text}</a></h3>);
        } else if (this.state.type === 'button') {
            return (<div><button>Call us: {text}</button></div>);
        } else if (this.state.type === 'span') {
            return (<span>Our call center is always available to take your call, contact us at {text}!</span>);
        } else {
            return (<pre>{text}</pre>);
        }
    }
}

export default Number