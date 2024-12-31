import React, { useEffect, useState } from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaRegUserCircle, FaHome, FaAddressBook } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoImagesOutline, IoSend } from "react-icons/io5";

interface props {
    setMobileWidth :(form: boolean)=> void
}
const ChatBox: React.FC<props> = (props) => {
const {setMobileWidth} = props
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
    const [mobileWidth, setMobileWidths] = useState<number>(window.innerWidth);
    const [mobileScreen, setMobileScreen] = useState<boolean>(false);

    useEffect(() => {
        const fetchWidth = () => {
            if (mobileWidth < 700) {
                setMobileScreen(true);
            } else {
                setMobileScreen(false);
            }
        };

        fetchWidth();
        window.addEventListener('resize', fetchWidth);

        return () => {
            window.removeEventListener('resize', fetchWidth);
        };
    }, [mobileWidth]);

    // Update height on window resize
    useEffect(() => {
        const handleResize = () => setScreenHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navbarHeight = screenHeight * 0.12; // 12% of screen height
    const chatHeight = screenHeight * 0.84;  // Remaining 88% of screen height

    return (
        <div
            className="d-flex flex-column justify-content-between"
            style={{ height: `${screenHeight * 0.85}px` }}
        >
            <Navbar
                className="container-fluid border p-2 mt-0 d-flex justify-content-between"
                style={{ height: `${navbarHeight}px`, overflowY: 'hidden' }}
            >
                <p className='text-align-right'>
                    <FaRegUserCircle className="me-3" size={30} /> Ameya Shriwas
                </p>
                <p>
                    <CiSettings className='me-3' size={30} />
                </p>
            </Navbar>

            <div className='container-fluid bg-light' style={{ height: `${chatHeight - navbarHeight}px` }}>
                {/* Chat content goes here */}
            </div>

            {/* Input Section */}
            <div
                className="container d-flex align-items-center justify-content-between p-3"
                style={{ gap: '10px', overflowY: 'hidden' }}
            >
                <IoImagesOutline size={30} />
                <Form.Control
                    className='pt-2 flex-grow-1'
                    type='text'
                    placeholder='Enter your message'
                />
                {mobileScreen ? <IoSend size={40} /> : <Button variant='success'>Send</Button>}
            </div>

            {/* Footer Section */}
           {mobileScreen &&  <div
                className="container-fluid text-light d-flex justify-content-around align-items-center"
                style={{ height: '60px' }}
            >
                <div className="text-center cursor-pointer" style={{cursor:'pointer'}} onClick={()=> setMobileWidth(false)}>
                    <FaAddressBook size={25} color='grey' />
                    <p style={{ fontSize: '12px', margin: '0', color:'grey' }}>Contacts</p>
                </div>
                <div className="text-center" style={{cursor:'pointer'}}>
                    <FaHome size={25}  color='grey'/>
                    <p style={{ fontSize: '12px', margin: '0', color:'grey' }}>Home</p>
                </div>
                <div className="text-center" style={{cursor:'pointer'}}>
                    <FaRegUserCircle size={25} color='grey' />
                    <p style={{ fontSize: '12px', margin: '0', color:'grey' }}>Profile</p>
                </div>
            </div>}
        </div>
    );
};

export default ChatBox;