import React, { useState } from 'react';
import Number from './Number.js';
import Configuration from './Configuration.js'
import logo from './logo.svg';
import './App.css';
import cnf from './cnf.json'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: cnf.gtmId
}
TagManager.initialize(tagManagerArgs)

function App() {
    const [components, setComponents] = useState([]);
    const [configured, setConfigured] = useState(false)

    const addComponent = (type) => {
        setComponents([...components, { number: "0401020304", text: "0401020304", type }])
    }

    const promise = () => {       
        let script_example = `window['$AA'].getNumber().then((numberObject) => {
    let text = script_example + "\\n\\nPromise Response:\\n" + JSON.stringify(numberObject, null, ' ')
    setComponents([...components, { text, type: 'text' }])
})` 
        window['$AA'].getNumber().then((numberObject) => {
            let text = script_example + "\n\nPromise Response:\n" + JSON.stringify(numberObject, null, ' ')
            setComponents([...components, { text, type: 'text' }])
        })
    }

    const clear = () => {
        setComponents([])
    }

    const configuredCallback = () => {
        setConfigured(true)
    }

    const displayButtons = () => {
        if (configured === true) {
            return (<div className="App-Buttons">
                &nbsp;&nbsp;
                <button onClick={() => addComponent('button')}>Add Button</button>
                &nbsp;&nbsp;
                <button onClick={() => addComponent('header')}>Add Header</button>
                &nbsp;&nbsp;
                <button onClick={() => addComponent('span')}>Add Span</button>
                &nbsp;&nbsp;
                <button onClick={promise}>Use Promise</button>
                &nbsp;&nbsp;
                <button onClick={clear}>Clear</button>
            </div>)
        } else {
            return (<div className="App-Configuration"><Configuration trackingCode={cnf.trackingCode} clientId={cnf.clientId} host={cnf.host || 'adriano-au.avanser.com'} configured={configuredCallback} /></div>)
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    React.JS<br />
                    AVANSER Dynamic Numbers
                </p>
                <pre>0401020304</pre>
                {displayButtons()}
                <hr className="App-Element" />
                <div className="App-Numbers">
                    {components.reverse().map((item, i) => (<div class="App-Element"><Number text={item.text} number={item.number} type={item.type} /></div>))}
                </div>
            </header>
        </div>
    );
}

export default App;
