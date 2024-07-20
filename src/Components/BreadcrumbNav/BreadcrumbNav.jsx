import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbNav = ({ showHomeLink }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbContainer>
      <Breadcrumbs aria-label="breadcrumb" separator=">" style={{ color: 'white' }}>
        {showHomeLink && (
          <StyledLink onClick={() => navigate('/')} style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </StyledLink>
        )}
        {pathnames.slice(0, 3).map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <StyledLink
              key={routeTo}
              onClick={() => navigate(routeTo)}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              {value}
            </StyledLink>
          );
        })}
      </Breadcrumbs>
    </BreadcrumbContainer>
  );
};

export default BreadcrumbNav;

const BreadcrumbContainer = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  &:hover {
    color: #ff0000;
  }
  &.active {
    font-weight: bold;
    color: #ff0000;
  }
`;
