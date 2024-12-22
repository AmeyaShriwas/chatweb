import React, { useEffect, useState } from 'react';
import { Navbar, Form, Button } from 'react-bootstrap';
import { FaRegUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoImagesOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";


const ChatBox = () => {
    const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
    const [mobileWidth, setMobileWidth] = useState<number>(window.innerWidth)
    const [mobileScreen, setMobileScreen] = useState<boolean>(false)

    useEffect(()=> {
        const fetchWidth = ()=> {
            if(mobileWidth < 700){
              setMobileScreen(true)
            }
            else{
                setMobileScreen(false)
            }
        }

        fetchWidth()
        window.addEventListener('resize', fetchWidth)

    }, [])

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
            style={{ height: `${chatHeight}px` }}
        >
        
            <Navbar
                className="container-fluid border p-2 mt-2 d-flex justify-content-between "
                style={{ height: `${navbarHeight}px`, overflowY:'hidden' }}
            >
                <p className='text-align-right'>
                    <FaRegUserCircle className="me-3" size={30} /> Ameya Shriwas
                </p>
                <p>
                    <CiSettings className='me-3' size={30} />
                </p>
            </Navbar>
            <div className='container-fluid  bg-light' style={{height:'100%'}}>

            </div>

            {/* Input Section */}
            <div
                className="container d-flex align-items-center justify-content-between p-3"
                style={{ gap: '10px', overflowY:'hidden' }}
            >
                <IoImagesOutline size={30} />
                <Form.Control
                    className='pt-2 flex-grow-1'
                    type='text'
                    placeholder='Enter your message'
                />
                {mobileScreen ? <IoSend size={40}/> :<Button variant='success'>Send</Button>}
            </div>
        </div>




    );
};

export default ChatBox;
