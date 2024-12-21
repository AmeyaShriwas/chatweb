import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { CiUser, CiLogout } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";

import Chat from './Chat';
import Profile from './Profile';

const Dashboard = () => {

    const [mobileWidth, setMobileWidth] = useState(true)
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const [selectedCategory, setSelectedCategory] = useState('chat')

    useEffect(() => {
        const fetchWidth = () => {
            if (window.innerWidth < 700) {
                setMobileWidth(false)
            }
            else {
                setMobileWidth(true)
            }
        }
        fetchWidth()

        window.addEventListener('resize', fetchWidth)

    }, [])

   const RenderFunction = (category)=> {
    if(category === 'chat'){
        return <Chat containerHeight={containerHeight} width={width} mobileWidth={mobileWidth}/>
    }
    if(category === 'profile'){
        return <Profile/>
    }
   }

    const navbarHeight = height * 0.12
    const containerHeight = height - navbarHeight

    return (
        <div style={{ height: `${height}` }}>
            <Navbar className='container-fluid sticky-top border p-2' expand="lg" style={{ height: `${navbarHeight}` }}>
                <Container className='container-fluid p-2'>
                    <Navbar.Brand onClick={()=>setSelectedCategory('chat')}  href="#">ChatWeb</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav" className='text-align-right '>
                        <Nav className="ms-auto">
                            <Nav.Link onClick={()=>setSelectedCategory('profile')} href="#"><CiUser />
                                Profile</Nav.Link>
                            <Nav.Link href="#"><FiMessageSquare />Notification</Nav.Link>
                            <Nav.Link href="#"><CiLogout />Logout</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

           {RenderFunction(selectedCategory)}
        </div>
    );
};

export default Dashboard;
