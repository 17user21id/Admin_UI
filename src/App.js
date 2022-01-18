import React, { useState, Fragment,useEffect,useMemo } from "react";
// import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import Search from './components/Search'
import Pagination from './components/Pagination'
import Button from 'react-bootstrap/Button'

const App = () => {
  const [contacts, setContacts] = useState([]);
 
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0)
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [stateCustomer, setCustomerState] = useState([])
  
  const [editFormData, setEditFormData] = useState({
    name: "",
    email:"",
    role: "",
    select:false
  });

  const [editContactId, setEditContactId] = useState(null);

 
  useEffect(() => {
    const getData = () => {
      

        fetch(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then(response => response.json())
            .then(json => {
              let contacts = json
              setContacts(
                contacts.map(d => {
                  return {
                    
                    id:d.id,
                    name:d.name,
                    email:d.email,
                    role:d.role,
                    select:false,
                    
                  }
                }
                )
              )
            });
    };

    getData();
}, []);

const commentsData = useMemo(() => {
  let computedComments = contacts;

  if (search) {
      computedComments = computedComments.filter(
          comment =>
              comment.name.toLowerCase().includes(search.toLowerCase()) ||
              comment.email.toLowerCase().includes(search.toLowerCase()) ||
              comment.role.toLowerCase().includes(search.toLowerCase())
      );
  }

  setTotalItems(computedComments.length);

  
  return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  
}, [contacts, currentPage, search]);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };



  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      email:editFormData.email,
      role: editFormData.role,
      select:editFormData.select
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      email:contact.email,
      role: contact.role,
      select:contact.select
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  const deleteCustomerByIds = () => {
    let arrayids = []
    const newContacts = [...contacts]
    commentsData.forEach(d => {
      if (d.select){
        arrayids.push(d.id)
      }
    })
    arrayids.forEach(i => {
      const index = newContacts.findIndex((contact) => contact.id === i)
      newContacts.splice(index, 1)
      
    })
    setContacts(newContacts)
  }

  const handleChange = e => {
    const id = e.target.id;
    let value = e.target.checked;
    setCustomerState(
      commentsData.map(d => {
        if (d.id === id){
          d.select = value;
        }
        return d;
      })
    ) 
    
  };

  return (
    <div className="app-container">
                  
                  <div className="row">
                        
                        <div>
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>
                  
      <form onSubmit={handleEditFormSubmit}>
                            
        <table>
          <thead>
            <tr>
              
            

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>

              <th style={{}}>
              <input
                type="checkbox"
                style={{height:'50px'}}
                onChange={e => {
                  
                  let value = e.target.checked;
                  
                  setCustomerState(
                    commentsData.map(d => {
                      d.select = value;
                      return d;
                    })
                  )
                   
                  
                }}
              />
            </th>

            </tr>
          </thead>
          <tbody>
            {commentsData.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleChange={handleChange}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <div className="row " style={{marginLeft:'10px' }}>
        
        <div className="flex-row-reverse">
        <Button variant="danger" onClick={() => {
          deleteCustomerByIds();
        }}>Delete</Button>
        </div>
      

      <div className="lastRow" style={{marginLeft:'100px'}}>
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
      </div>

      
    </div>
  );
};

export default App;
