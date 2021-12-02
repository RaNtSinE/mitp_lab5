import './App.css';
import React from "react";

class Node extends React.Component{

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            selected: false,
            focused: false
        }

        this.enterHandler = this.enterHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.keyFocus = this.keyFocus.bind(this);
        document.addEventListener('keydown', this.keyFocus)

    }

    keyFocus(e) {
        if (this.state.focused)
        {
            if (e.code === "ArrowLeft" && this.props.L)
                this.props.setFocused(this.props.L)
            else if (e.code === "ArrowUp" && this.props.U)
                this.props.setFocused(this.props.U)
            else if (e.code === "ArrowRight" && this.props.R)
                this.props.setFocused(this.props.R)
            else if (e.code === "ArrowDown" && this.props.D)
                this.props.setFocused(this.props.D)
            else if (e.code === "Enter")
                this.props.setSelected(this.props.id)
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.focus === this.props.id)
            this.setState({focused: true});
        if (nextProps.selected === this.props.id)
            this.setState({selected: true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.focus !== this.props.focus && this.props.focus !== this.props.id)
            this.setState({focused: false});
        if (prevProps.selected !== this.props.selected && this.props.selected !== this.props.id)
            this.setState({selected: false});
    }

    enterHandler() {
        this.setState({focused: true});
        this.props.setFocused(this.id);
    }

    clickHandler() {
        this.setState({selected: true});
        this.props.setSelected(this.id);
    }

    render() {
        let border = "";
        let background = ""
        if (!this.state.focused)
            border = "1px solid orange";
        else
            border = "2px solid red";

        if(!this.state.selected)
            background = "";
        else
            background = "orange";
        return (
            <div className="Node" style={{
                position: "absolute",
                background: background,
                border: border,
                borderRadius: "5px",
                width: this.props.width + "px",
                height: this.props.height + "px",
                left: this.props.x + "px",
                top: this.props.y + "px"}}
                onMouseEnter={this.enterHandler}
                onClick={this.clickHandler}>
                <div className="NodeId">
                    {this.props.id}
                </div>
            </div>
        );
    }


}

export default Node;
