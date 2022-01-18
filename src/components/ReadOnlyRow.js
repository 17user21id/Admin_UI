import React from "react";
import { FiEdit,FiTrash2 } from "react-icons/fi";
const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,handleChange }) => {
  
  return (
    <tr >
      
      <td style={{backgroundColor: contact.select ? 'gray':'#cdebfd'}}>{contact.name}</td>
      <td style={{backgroundColor: contact.select ? 'gray':'#cdebfd'}}>{contact.email}</td>
      <td style={{backgroundColor: contact.select ? 'gray':'#cdebfd'}}>{contact.role}</td>

      <td style={{backgroundColor: contact.select ? 'gray':'#cdebfd'}}>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
         <FiEdit style={{color:'green'}}/>
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          <FiTrash2 style={{color:'red'}}/>
        </button>
      </td>

      <td style={{backgroundColor: contact.select ? 'gray':'#cdebfd'}}>
        <input
          type="checkbox"
          checked={contact.select}
          id={contact.id}
          style={{height:'50px'}}
          onChange={handleChange}
        />
      </td>
      
    </tr>
  );
};

export default ReadOnlyRow;
