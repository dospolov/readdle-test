import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Empty, Layout, Tabs } from 'antd';
import EmailListItem from './EmailListItem';
import EmailContent from './EmailContent';

const { Content } = Layout;
const { TabPane } = Tabs;

const MainContent = () => {
  const [filteredEmails, setFilteredEmails] = useState([]);
  useEffect(() => {
    ipcRenderer.on('sendEmailList', (event, response) => {
      setFilteredEmails(response);
    });
  }, []);

  return (
    <Content>
      {!filteredEmails.length ? (
        <Empty description={false} />
      ) : (
        <Tabs defaultActiveKey="1" tabPosition="left" className="email-list">
          {filteredEmails.map(email => (
            <TabPane
              tab={<EmailListItem email={email} />}
              key={email.id}
              className="content"
            >
              <EmailContent email={email} />
            </TabPane>
          ))}
        </Tabs>
      )}
    </Content>
  );
};

export default MainContent;
