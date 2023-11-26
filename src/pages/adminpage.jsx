import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import "../assets/adminpage.css";
import config from "../config";

const AdminPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [vinyls, setVinyls] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [addOption, setAddOption] = useState("vinyl");
  const [addInputs, setAddInputs] = useState({});

  const getVinyls = () => {
    fetch(`${config.apiBaseUrl}/api/music`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVinyls(data);
      });
  };

  const getUsers = () => {
    fetch(`${config.apiBaseUrl}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };

  const updateObject = () => {
    const url = selectedItem.username ? "user" : "music";
    try {
      fetch(`${config.apiBaseUrl}/api/${url}/${selectedItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(selectedItem),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (selectedItem.username) {
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === selectedItem._id ? selectedItem : user
                )
              );
            } else {
              setVinyls((prevVinyls) =>
                prevVinyls.map((vinyl) =>
                  vinyl._id === selectedItem._id ? selectedItem : vinyl
                )
              );
            }
          }
        });
    } catch (error) {
      console.error("Error updating object:", error);
    }
  };

  const deleteObject = () => {
    const url = selectedItem.username ? "user" : "music";
    try {
      fetch(`${config.apiBaseUrl}/api/${url}/${selectedItem._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            if (selectedItem.username) {
              const newUsers = users.filter(
                (user) => user._id !== selectedItem._id
              );
              setUsers(newUsers);
            } else {
              const newVinyls = vinyls.filter(
                (vinyl) => vinyl._id !== selectedItem._id
              );
              setVinyls(newVinyls);
            }
          }
        });
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };

  useEffect(() => {
    getVinyls();
    getUsers();
  }, []);

  const addVinyl = () => {
    fetch(`${config.apiBaseUrl}/api/music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(addInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setVinyls([...vinyls, data]);
        }
      });
    setAddInputs({});
  };

  const addUser = () => {
    fetch(`${config.apiBaseUrl}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(addInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setUsers([...users, data]);
        }
      });
    setAddInputs({});
  };

  return (
    <>
      <NavBar loggedIn={true} />
      <h1>Admin Page</h1>
      <div className="info">
        <div className="users object-display">
          <h2>Users</h2>
          {users.map((user, index) => {
            return (
              <div
                className={`object ${
                  selectedItemIndex === user._id ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  setSelectedItem(user);
                  setSelectedItemIndex(user._id);
                }}
              >
                <p>{user._id}</p>
              </div>
            );
          })}
        </div>
        <div className="vinyls object-display">
          <h2>Vinyls</h2>
          {vinyls.map((vinyl, index) => {
            return (
              <div
                className={`object ${
                  selectedItemIndex === vinyl._id ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  setSelectedItem(vinyl);
                  setSelectedItemIndex(vinyl._id);
                }}
              >
                <p>{vinyl._id}</p>
              </div>
            );
          })}
        </div>
        <div className="edit">
          <h2>Edit</h2>
          <div className="edit-inputs">
            {selectedItem ? (
              <>
                {Object.keys(selectedItem).map((key, index) => {
                  return (
                    <div className="edit-input" key={index}>
                      <p>{key}</p>
                      <input
                        type="text"
                        value={selectedItem[key]}
                        onChange={(e) => {
                          setSelectedItem({
                            ...selectedItem,
                            [key]: e.target.value,
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <p>Select an item to edit</p>
              </>
            )}
          </div>
          <div className="edit-buttons">
            <button
              className="edit-button"
              onClick={() => setOpenAddMenu(!openAddMenu)}
            >
              Add
            </button>
            <button className="edit-button" onClick={deleteObject}>
              Delete
            </button>
            <button className="edit-button" onClick={updateObject}>
              Update
            </button>
          </div>
        </div>
        {openAddMenu ? (
          <>
            {
              <div className="add-menu">
                <h2>Add</h2>
                <div className="add-options">
                  <button
                    className="add-menu-button"
                    onClick={() => {
                      setAddOption("vinyl");
                      setAddInputs({});
                    }}
                  >
                    Vinyl
                  </button>
                  <button
                    className="add-menu-button"
                    onClick={() => {
                      setAddOption("user");
                      setAddInputs({});
                    }}
                  >
                    User
                  </button>
                </div>
                {addOption === "vinyl" ? (
                  <div className="add-menu-inputs">
                    <input
                      type="text"
                      placeholder="Title"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Singer"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          singer: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          categories: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Image"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          img: e.target.value,
                        }))
                      }
                    />
                    <button onClick={addVinyl}>Add</button>
                  </div>
                ) : (
                  <div className="add-menu-inputs">
                    <input
                      type="text"
                      placeholder="Username"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      onChange={(e) =>
                        setAddInputs((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <button onClick={addUser}>Add</button>
                  </div>
                )}
              </div>
            }
          </>
        ) : null}
      </div>
    </>
  );
};

export default AdminPage;
