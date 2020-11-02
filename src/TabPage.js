import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import axios from 'axios';

import TabUsers from './TabUsers';
import Header from './Header';
import UserContext from './UserContext';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const TabPage = () => {
  const [users, setUsers] = useContext(UserContext);
  const [filters , setFilters] = useState({name : '',sortName : false , sortEmail : false , gender : null});
  
  const searchInList = (name) => {
    setFilters(oldFilters => ({
      ...oldFilters, 
      name,
    }));
  };
  const getData = async (number) => {
    try {
      const response = await axios('https://randomuser.me/api/?results=' + number);
      return response.data.results;
    }
    catch (e) {
      console.log(e);
    }
    return [];
  }
  const changeData = async (number) => {
    const response = await getData(number);
    setUsers([...response, ...users]);
  };
  const handleChange = event => {
    searchInList(event.target.value);
  };
  const handleChangeSelect = event =>{
    const gender = event ? event.value : null;
    setFilters(oldFilters => ({
      ...oldFilters, 
      gender,
    }));
  };
  const sortEmail = () => {
    setFilters(oldFilters => ({
      ...oldFilters, 
      sortEmail : !filters.sortEmail,
    }));
  };
  const sortName = () => {
    setFilters(oldFilters => ({
      ...oldFilters, 
      sortName : !filters.sortName,
    }));
  };
  const handleUsers = () =>{
   const newUsers = users.filter((element) => {     
                  if(filters.gender) if(filters.gender !== element.gender) return false;
                  return element.name.first.toUpperCase().startsWith(filters.name.toUpperCase()) || element.name.last.toUpperCase().startsWith(filters.name.toUpperCase());
                });

    if(newUsers.length>0){
      if(filters.sortEmail) newUsers.sort((a,b)=> { if(a.email < b.email)return -1;
                                                    if (a.email > b.email)return 1;
                                                    return 0;});
      if(filters.sortName) newUsers.sort((a,b)=>{ if(a.name.first < b.name.first)return -1;
                                                  if (a.name.first > b.name.first)return 1;
                                                  return 0;});
    }
    return newUsers;
  };
  useEffect(() => {
    const callApi = async () => {
      if(users.length===0){
        const data = await getData(5);
        setUsers(data);
      }
      localStorage.setItem('users',JSON.stringify(users));
    };
    callApi();
  }, [users,setUsers]);

  const usersFiltered =  handleUsers();


  return (
    <div className="container-fluid">
      <div>
        <Header onFetch={() => changeData(15)} />
        <span>Nombre d'utilisateur(s) : {usersFiltered.length}</span>
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />

    <Select  placeholder= 'Select Gender' isClearable 
            onChange={handleChangeSelect}
            options={[{ value: 'female', label: 'female' },
                      { value: 'male', label: 'male' }]} />
      

    {usersFiltered.length >0 ? 
    
          <table className="table table-hover">
                <thead>
                  <tr>
                    <th></th>
                    <th onClick={sortName}>Nom</th>
                    <th onClick={sortEmail}>Email</th>
                    <th>Tel</th>
                  </tr>
                </thead>
                <tbody><TabUsers users={usersFiltered} /></tbody>
           </table>
        :
    
           <div className="alert alert-primary text-center" role="alert">
            Pas d'utilisateurs
            </div>
    
    }


        
      </div>
    </div>
  );
}

export default TabPage;
