import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

const FOLDERS = [
  { id: 'inbox', icon: 'mail' },
  { id: 'snoozed', icon: 'clock-circle' },
  { id: 'pinned', icon: 'pushpin' },
  { id: 'trash', icon: 'delete' },
];

const Sidebar = () => {
  const [currentFolder, setCurrentFolder] = useState(FOLDERS[0].id);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    ipcRenderer.send('setCurrentFolder', currentFolder);
  }, [currentFolder]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      width="150"
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[currentFolder]} mode="inline">
        {FOLDERS.map(folder => (
          <Menu.Item key={folder.id} onClick={e => setCurrentFolder(e.key)}>
            <Icon type={folder.icon} />
            <span>{folder.id.replace(/^./, str => str.toUpperCase())}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
