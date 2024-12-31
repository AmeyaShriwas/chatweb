import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { CiUser, CiLogout } from "react-icons/ci";
import { FiMessageSquare } from "react-icons/fi";
import Chat from "./Chat";
import Profile from "./Profile";

const Dashboard = () => {
  const logo: string = require("./../assets/logo.png");

  const [mobileWidth, setMobileWidth] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [selectedCategory, setSelectedCategory] = useState<string>("chat");
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category); // Set category
    setExpanded(false); // Collapse the navbar
  };

  useEffect(() => {
    const fetchWidth = () => {
      if (window.innerWidth < 700) {
        setMobileWidth(false);
      } else {
        setMobileWidth(true);
      }
    };
    fetchWidth();

    window.addEventListener("resize", fetchWidth);
    return () => window.removeEventListener("resize", fetchWidth); // Cleanup
  }, []);

  const RenderFunction = (category: string) => {
    if (category === "chat") {
      return <Chat containerHeight={containerHeight} mobileWidth={mobileWidth} setMobileWidth={setMobileWidth} />;
    }
    if (category === "profile") {
      return <Profile />;
    }
  };

  const navbarHeight = height * 0.12;
  const containerHeight = height - navbarHeight;

  return (
    <div style={{ height: `${height}px` }}>
      <Navbar
        className="container-fluid sticky-top p-2"
        expand="lg"
        expanded={expanded}
        style={{ height: "auto" }}
      >
        <Container className="container-fluid p-2">
          <Navbar.Brand onClick={() => handleNavClick("chat")} href="#">
            <img style={{ width: "100px" }} src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarNav"
            onClick={() => setExpanded(!expanded)} // Toggle expanded state
          />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => handleNavClick("profile")} href="#">
                <CiUser /> Profile
              </Nav.Link>
             
              <Nav.Link onClick={() => handleNavClick("logout")} href="#">
                <CiLogout /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {RenderFunction(selectedCategory)}
    </div>
  );
};

export default Dashboard;
