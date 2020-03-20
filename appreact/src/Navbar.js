import React from 'react';
import logo from './logo.png';
import { Container,Collapse,Navbar,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const Header = (props) => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Container>
            <NavbarBrand href="/"><img src={logo} alt="Logo" /></NavbarBrand>
            <Collapse navbar>
            <Nav className="mr-auto" navbar>
                
                </Nav>

                <Nav>
                <UncontrolledDropdown nav inNavbar>

                <DropdownToggle nav caret>
                Wishlist ({props.wishList.length})
                </DropdownToggle>

                <DropdownMenu className="wishlist">
                  {props.wishList}
                </DropdownMenu>

                </UncontrolledDropdown>
                  <NavItem>
                  <NavLink href="/">{props.globalCounterLikes} <FontAwesomeIcon icon={faHeart} /></NavLink>
                  </NavItem>
                </Nav>
                
            </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;