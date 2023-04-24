import React, { useState } from 'react'
import './App.css'

const Item = ({ itemInfo, handleUpdate, handleDelete }) => {

    const [isEdit, setIsEdit] = useState(false)
    const [iName, setIName] = useState(itemInfo.name);
    const [iQuantity, setIQuantity] = useState(itemInfo.quantity);

    // function to handle edit button functionality
    const handleEdit = () => {
        setIsEdit(prev => !prev)
    }

    // onclick function for 'cancel' button
    const handleCancel = () => {
        handleEdit()
        setIName(itemInfo.name);
        setIQuantity(itemInfo.quantity);
    }

    return (
        <div className='item'>
            {/* by using conditional statement we'll display different buttons on screen */}
            {
                isEdit ? (<input type='text' value={iName} onChange={(e) => setIName(e.target.value)} />) : (<p>{iName}</p>)
            }

            {
                isEdit ? (<input type='number' value={iQuantity} onChange={(e) => setIQuantity(e.target.value)} />) : (<p>{iQuantity}</p>)
            }

            <div>

                {
                    isEdit ? (<button type="submit" onClick={handleCancel} style={{ backgroundColor: 'red' }}>Cancel</button>) : (<button type="submit" onClick={handleEdit}>Edit</button>)
                }

                {
                    isEdit ? (<button type="submit" onClick={() => { handleEdit(); handleUpdate(iName, iQuantity, itemInfo._id) }} style={{ backgroundColor: 'green', marginLeft: '10px' }}>Save</button>) : (<button type="submit" onClick={()=>handleDelete(itemInfo._id)} style={{ marginLeft: '10px' }}>Delete</button>)
                }
            </div>
        </div>
    )
}

export default Item