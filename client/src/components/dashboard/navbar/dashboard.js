// import React, { Component } from "react";
// import "./App.css";
// import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
// import Main from "./Main";
// import { BrowserRouter, Link } from "react-router-dom";

// class Navbar extends Component {
//   render() {
//     return (
//       <div className="demo-big-content">
//         <BrowserRouter>
//           <Layout>
//             <Header
//               className="header-color"
//               title={
//                 <Link style={{ textDecoration: "none", color: "white" }} to="/">
//                   Family Tree
//                 </Link>
//               }
//               scroll
//             >
//               <Navigation>
//                 <Link to="/aboutme">About Me</Link>
//                 <Link to="/projects">Projects</Link>
//                 <Link to="/contact">Contact</Link>
//                 <Link to="/contactus">Contact Us</Link>
//               </Navigation>
//             </Header>
//             <Drawer
//               title={
//                 <Link style={{ textDecoration: "none", color: "black" }} to="/">
//                   Family Tree
//                 </Link>
//               }
//             >
//               <Navigation>
//                 <Link to="/aboutme">About Me</Link>
//                 <Link to="/projects">Projects</Link>
//                 <Link to="/contact">Contact</Link>
//                 <Link to="/contactus">Contact Us</Link>
//               </Navigation>
//             </Drawer>
//             <Content>
//               <div className="page-content" />
//               <Main />
//             </Content>
//           </Layout>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default Navbar;
