import React from 'react';
import {Link} from "react-router-dom";

class RouteLabel extends React.Component {
    render() {
        return(
            <Link to={"/" + this.props.Route}>{this.props.RouteTitle}</Link>
        )
    }
}

export default RouteLabel;