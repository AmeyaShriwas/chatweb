import React, { useEffect } from 'react'
import ContactsList from './ContactsList'
import ChatBox from './ChatBox'

interface ChatProps {
  containerHeight: number, 
  mobileWidth: boolean
}

const Chat:React.FC<ChatProps> = (props) => {
    const {containerHeight, mobileWidth} = props

  return (
    <div className="row" style={{ height: `${containerHeight}`, overflowX:'hidden' }}>
                {mobileWidth && <div className="col-3 h-100">
                    <ContactsList />
                </div>}
                <div className="col">
                    <ChatBox />
                </div>
            </div>
  )
}

export default Chat
