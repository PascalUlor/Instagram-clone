import React from 'react';

const Authenticate = (WrappedComponent, Login)  => class extends React.Component {
    render() {
      let viewComponent;
      if (localStorage.getItem("User")) {
        viewComponent = <WrappedComponent {...this.props}/>
      } else {
        viewComponent = <Login />
      }
      return (
        <div className="container">
          {viewComponent}
        </div>
      )
    }
  }




  export default Authenticate; 