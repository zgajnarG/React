import React from 'react';
import { useHistory } from "react-router-dom";

const TabUsers = (props) => {
    const history = useHistory();

    const items = props.users.map((user) => {
        return <tr key={user.email} onClick={() => { history.push('/user/' + user.login.uuid); }}>
            <td><img alt={user.email} src={user.picture.thumbnail} /></td>
            <td>{user.name.first} {user.name.last}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
        </tr>;
    });
    return items;
}

export default TabUsers;