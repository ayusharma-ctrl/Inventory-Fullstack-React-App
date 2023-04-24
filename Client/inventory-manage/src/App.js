import './App.css';
import React, { useState, useEffect } from 'react'
import Item from './Item';
import io from 'socket.io-client'
import axios from 'axios';

// connection between our server and client, here we give server uri
const socket = io.connect('http://localhost:4000');
const serverUrl = "http://localhost:4000/api/v1";

function App() {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [data, setData] = useState([]);
  //function to add a new item to inventory on click of Save button
  const handleAdd = async (nameOfItem, quantityOfItem) => {
    try {
      if (nameOfItem && quantityOfItem) {
        const { data } = await axios.post(`${serverUrl}/inventory`,
          { name: nameOfItem, quantity: quantityOfItem },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setItemName('');
        setItemQuantity('')
        getAllItems();
        //custom socket event to send data from client/frontend to server/backend side
        socket.emit('send_to_server', data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // function to update the item details 
  const handleUpdate = async (nameOfItem, quantityOfItem, id) => {
    try {
      if (nameOfItem && quantityOfItem) {
        const { data } = await axios.put(`${serverUrl}/inventory/${id}`,
          { name: nameOfItem, quantity: quantityOfItem },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        getAllItems();
        //custom socket event to send data from client/frontend to server/backend side
        socket.emit('send_to_server', data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // function to delete an item from the inventory
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${serverUrl}/inventory/${id}`);
      socket.emit('send_to_server', data.message)
      getAllItems();
    } catch (error) {
      console.log(error)
    }
  }
  // function to get all the items from inventory & in order to get the details of a particular item, use the same url which we are using in update or delete function, just make a "get" request 
  const getAllItems = async () => {
    try {
      const response = await axios.get(`${serverUrl}/inventory`);
      setData(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    //custom socket event to receive a message/data from server/backend side
    socket.on("message_from_server", (message) => {
      getAllItems();
      alert(message);
    })
    getAllItems();
  }, [socket])


  return (
    <>
      <div>
        <h1> INVENTORY </h1>
      </div>

      <div className="userInputs">
        <input type="text" placeholder='Name of Item' value={itemName} onChange={(e) => setItemName(e.target.value)} />
        <input type="number" placeholder='Quantity' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} />
        <button type="submit" onClick={() => handleAdd(itemName, itemQuantity)}> Save </button>
      </div>

      <div className='list'>
        <ol>
          {data && data.length === 0 ? (
            <div>No Data</div>
          ) : data && data.length > 0 ? (
            <div>
              {data.map((e, i) => {
                return <li key={i}>
                  <Item className="inventoryItem" itemInfo={e} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                </li>
              })}
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </ol>
      </div>
    </>
  );
}

export default App;
