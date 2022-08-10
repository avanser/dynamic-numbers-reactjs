import React from 'react';


const includeScript = (url, id = null) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    if (id) {
        script.id = id;
    }
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
    }
};


class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackingCode: props.trackingCode || '',
            clientId: props.clientId || '',
            included: false,
            host: props.host
        };
        this.handleChange = this.handleChange.bind(this);
        this.configured = props.configured || (() => {})
    }
    
    handleChange = (e) => {
        let state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }

    render() {
        const configure = () => {
            if(this.state.clientId === '' || this.state.trackingCode === '' || this.state.included === true) {
                return
            }
            window.AvanserOptions = {
                trackingCode: this.state.trackingCode,
                clientId: this.state.clientId
            }
            includeScript(`https://${this.state.host}/aa.js`, 'AVANSERjs');
            this.setState({ included: true })
            this.configured()
        }

        if (this.state.included === false) {
            return (<table className='Configuration-View'>
                <tbody>
                    <tr>
                        <th>Client ID</th>
                        <td><input name="clientId" type="number" minLength={4} maxLength={4} value={this.state.clientId} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <th>Tracking Code</th>
                        <td><input name="trackingCode" type="number" minLength={1} maxLength={4} value={this.state.trackingCode} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td><button onClick={configure}>START TEST</button></td>
                    </tr>
                </tbody>
            </table>)
        }
    }
}

export default Configuration