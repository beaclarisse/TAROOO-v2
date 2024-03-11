// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button component={Link} to="/forum" onClick={onClose}>
          <ListItemText primary="Forum" />
        </ListItem>
        <ListItem button component={Link} to="/TaroPosts" onClick={onClose}>
          <ListItemText primary="About Taro" />
        </ListItem>
        <ListItem button component={Link} to="/TaroDiseases" onClick={onClose}>
          <ListItemText primary="Diseases" />
        </ListItem>
        <ListItem button component={Link} to="/preventive" onClick={onClose}>
          <ListItemText primary="Preventive Measures" />
        </ListItem>
        <ListItem button component={Link} to="/consultation" onClick={onClose}>
          <ListItemText primary="Consultation" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
