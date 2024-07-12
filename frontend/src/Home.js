"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var material_1 = require("@mui/material");
var react_1 = require("react");
var Home = function () {
    var _a = (0, react_1.useState)(''), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var handleLogin = function (e) {
        e.preventDefault();
        console.log();
    };
    return (React.createElement(material_1.Container, null,
        React.createElement(material_1.Stack, { component: "form", onSubmit: handleLogin, sx: {
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                gap: '10px'
            } },
            React.createElement(material_1.Typography, { variant: "h6" }, " SIGN IN "),
            React.createElement(material_1.TextField, { id: "email", size: "small", label: "Email", type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); } }),
            React.createElement(material_1.TextField, { id: "password", size: "small", label: "Password", type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); } }),
            React.createElement(material_1.Button, null, "Submit"))));
};
exports.default = Home;
