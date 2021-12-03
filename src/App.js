import './App.css';
import React from "react";
import Node from "./Node"

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            focus: null,
            selected: null
        }

        this.debounce = false;
        this.debounceId = null;

        this.setSelected = this.setSelected.bind(this);
        this.setFocused = this.setFocused.bind(this);
    }

    setFocused(id) {
        if (!this.debounce && id && id !== this.state.focus)
        {
            this.debounce = true;
            window.setTimeout(()=>{this.debounce = false}, 10);
            console.log("Focused " + id);
            this.setState({focus: id});
        }
    }

    setSelected(id) {
        console.log("Click at rect " + id);
        this.setState({selected: id});
    }

    componentDidMount() {
        this.setFocused("1-1");
    }

    createNodeConfig() {
        return(
            [
                {id: "1-1", x: 0,     y: 0,   width: 100, height: 100, D: "2-1", R: "1-2", L: "1-3", U: "4-1"},
                {id: "1-2", x: 150,   y: 0,   width: 400, height: 100, D: "2-2", R: "1-3", L: "1-1", U: "4-2"},
                {id: "1-3", x: 600,   y: 0,   width: 100, height: 100, D: "2-4", R: "1-1", L: "1-2", U: "4-3"},
                {id: "2-1", x: 0,     y: 150, width: 100, height: 250, D: "4-1", R: "2-2", L: "2-4", U: "1-1"},
                {id: "2-2", x: 150,   y: 150, width: 100, height: 100, D: "3-1", R: "2-3", L: "2-1", U: "1-2"},
                {id: "2-3", x: 450,   y: 150, width: 100, height: 100, D: "3-3", R: "2-4", L: "2-2", U: "1-2"},
                {id: "2-4", x: 600,   y: 150, width: 100, height: 100, D: "3-3", R: "2-1", L: "2-3", U: "1-3"},
                {id: "3-1", x: 150,   y: 300, width: 100, height: 100, D: "4-2", R: "3-2", L: "2-1", U: "2-2"},
                {id: "3-2", x: 300,   y: 300, width: 100, height: 100, R: "3-3", L: "3-1"},
                {id: "3-3", x: 450,   y: 300, width: 250, height: 100, D: "4-3", R: "2-1", L: "3-2", U: "2-3"},
                {id: "4-1", x: 0,     y: 450, width: 100, height: 100, D: "1-1", R: "4-2", L: "4-3", U: "2-1"},
                {id: "4-2", x: 150,   y: 450, width: 100, height: 100, D: "1-2", R: "4-3", L: "4-1", U: "3-1"},
                {id: "4-3", x: 600,   y: 450, width: 100, height: 100, D: "1-3", R: "4-1", L: "4-2", U: "3-3"}
            ]
        )
    }

    createNodeElements() {
        let config = this.createNodeConfig();
        let nodes = config.map((node)=>
            <Node
                key={node.id}
                id={node.id}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                setFocused={this.setFocused}
                focus={this.state.focus}
                setSelected={this.setSelected}
                selected={this.state.selected}
                L={node.L}
                U={node.U}
                R={node.R}
                D={node.D}/>
        );
        return(nodes);
    }

    render() {

        let content = this.createNodeElements();

        return (
            <div className="App">
                {content}
            </div>
        );
    }

}

export default App;
