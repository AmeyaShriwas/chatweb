import React from 'react'
import ContactsList from './ContactsList'
import ChatBox from './ChatBox'

const Chat = (props) => {
    const {containerHeight, width, mobileWidth} = props
  return (
    <div className="row" style={{ height: `${containerHeight}`, overflowX:'hidden' }}>
                {mobileWidth && <div className="col-3 h-100" style={{ width: `${width}` }}>
                    <ContactsList />
                </div>}
                <div className="col" style={{ width: `${width}` }}>
                    <ChatBox />
                </div>
            </div>
  )
}

export default Chat
