import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="role"
          value={editFormData.role}
          onChange={handleEditFormChange}
        ></input>
      </td>
     
      <td>
        <button type="submit" style={{color:'green'}}>Save</button>
        <button type="button" onClick={handleCancelClick} style={{color:'red'}}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
