import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";



export default function DashboardNavbar() {
  return (
    <Nav>
      <div className="title">
        <h1>
         <span className="stroke-text" >Admin</span> <span>Dashboard</span>
        </h1>
      </div>
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  color: white;
  .title {
    h1 {
        margin-left:18vw;
        color: white;
        // font-family: "Permanent Marker", cursive;
        letter-spacing: 0.2rem;
        font-size : 40px;
        font-weight: bold;
    }
    }
  }
  
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;
