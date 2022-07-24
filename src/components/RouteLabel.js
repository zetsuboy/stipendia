import React from 'react';
import {Link} from "react-router-dom";

class RouteLabel extends React.Component {
    render() {
        return(
            <Link className='rLink' to={"/" + this.props.Route}><a>{this.props.RouteTitle}</a></Link>
        )
    }
}

export default RouteLabel;