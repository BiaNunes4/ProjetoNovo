import './index.css';
import { useEffect, useState } from "react";
import ContentWrapper from '../components/ContentWrapper';
import ForumIcon from '@material-ui/icons/Forum';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, LinearProgress
} from '@material-ui/core';

import { FilterForm, MessageDetails, MessageForm } from '../../components';

const Home = () => {
  const [messages, setMessages] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [addMessageModalOpen, setAddMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMessages = async (filter='') => {
    setLoading(true);
    let url = `api/messages${filter}`;
    const response = await fetch(url);
    return await response.json();
  }

  const updateMessages = (msgs) => {
    setLoading(false);
    setMessages(msgs);
  }

  useEffect(()=>{
    ( async () => {
      const msgs = await getMessages()
      updateMessages(msgs);
    })();
  }, []);

  const handleFormSubmit = async ({channel, trigger, timer}) => {
    const msgs = await getMessages(`?channel=${channel}&trigger=${trigger}&timer=${timer}`);
    updateMessages(msgs);
  }

  const showMessage = (message) => { 
    setModalOpen(true)
    setSelectedMessage(message)
  }

  const NewMessageButton = () => {
    return(
      <Button class="buttonMensagem"
      
        
        onClick={() => {
          setAddMessageModalOpen(true);
        }}
      >
        Nova Mensagem
      </Button>
    )
  }

  return (
    <>
      <ContentWrapper
        header={{
          bgColor:'transparent',
          title: 'Messagens',
          rightContent: NewMessageButton
        }}
      >
        <div className='homePageContent'>
          <FilterForm onSubmit={handleFormSubmit}/>

          {loading && <LinearProgress />}
          {!loading && 
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Canal</TableCell>
                    <TableCell>Gatilho</TableCell>
                    <TableCell>Timer</TableCell>
                    <TableCell>A????es</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    messages.map(
                      (message, idx) => (
                        <TableRow key={idx}
                         >
                          <TableCell>{message.channel}</TableCell>
                          <TableCell>{message.trigger}</TableCell>
                          <TableCell>{message.timer}</TableCell>
                          <TableCell><button onClick={()=>{ showMessage(message)}}>Ver mensagem</button></TableCell>
                        </TableRow>
                      )
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          }
        </div>
      </ContentWrapper>
      
      { modalOpen && <MessageDetails message={selectedMessage} onClose={()=>setModalOpen(false)}/>}
      { addMessageModalOpen && <MessageForm onClose={
        async () => {
          setAddMessageModalOpen(false)
          const msgs = await getMessages()
          updateMessages(msgs);
        }
      }/>}
    </>
  )
}

export default Home;