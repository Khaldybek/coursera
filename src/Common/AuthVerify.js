import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
        // eslint-disable-next-line no-unused-vars
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    // eslint-disable-next-line react/prop-types
    props.history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            const decodedJwt = parseJwt(user.accessToken);

            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
            }
        }
    });

    return <div></div>;
};

export default withRouter(AuthVerify);