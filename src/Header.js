import React  from 'react';


const Header = (props) =>{
    return (<div>
                  <h1>React example</h1>
                  <hr/>
                  <button className="btn btn-primary" onClick={props.onFetch}>Fetch users</button>
            </div>
            );
  }
  
export default Header; 