import React, { useContext } from 'react';
import UserContext from './UserContext';

const UserInfo = (props) => {
  const user = useContext(UserContext)[0].find(element => element.login.uuid === props.match.params.id);
  return (user ? <div>
                  <h1>{user.name.first} {user.name.last}</h1>
                  <img alt={user.email} src={user.picture.thumbnail} />
                  <span>Age : {user.dob.age}  Username : {user.login.username}</span>
                </div>
                :
                <h1>La personne n'est pas chargée</h1>);
}

export default UserInfo;
