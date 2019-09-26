import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { Typography, Button } from 'antd';
import DOMPurify from 'dompurify';
import he from 'he';
import { saveAs } from 'file-saver';

const { Title, Text } = Typography;

const EmailContent = ({ email }) => {
  const [emailContent, updateEmailContent] = useState('Loading...');
  useEffect(() => {
    async function fetchData() {
      const result = await fetch(email.content).then(r => r.text());
      updateEmailContent(result);
    }
    fetchData();
  }, [email.content]);

  return (
    <div>
      <p>
        <Button
          icon={email.isUnread ? 'eye' : 'eye-invisible'}
          onClick={() => ipcRenderer.send('updateEmail', email.id, 'isUnread')}
        >
          {email.isUnread ? 'Read' : 'Unread'}
        </Button>
        <Button
          icon={email.isDeleted ? 'undo' : 'delete'}
          onClick={() => ipcRenderer.send('updateEmail', email.id, 'isDeleted')}
        >
          {email.isDeleted ? 'Restore' : 'Delete'}
        </Button>
        <Button
          icon="save"
          onClick={() => {
            const blob = new Blob([emailContent], {
              type: 'text/plain;charset=utf-8',
            });
            saveAs(blob, `${he.decode(email.subject)}.html`);
          }}
        >
          Save
        </Button>
      </p>
      <Text code>{email.from}</Text>
      <Title level={4}>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(email.subject),
          }}
        ></p>
      </Title>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(emailContent),
        }}
      ></div>
    </div>
  );
};

export default EmailContent;
