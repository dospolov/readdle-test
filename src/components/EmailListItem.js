import React from 'react';
import { Icon, Typography } from 'antd';
import DOMPurify from 'dompurify';

const { Paragraph } = Typography;

const EmailListItem = ({ email }) => (
  <div className={`email-preview ${email.isUnread && 'email-unread'}`} key={email.id}>
    <h4>
      <Paragraph ellipsis>
        <Icon type="user" />
        <strong
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(email.from),
          }}
        />
      </Paragraph>
    </h4>
    <Paragraph ellipsis>
      <strong
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(email.subject),
        }}
      />
    </Paragraph>
    <Paragraph ellipsis>
      <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(email.content),
        }}
      ></span>
    </Paragraph>
  </div>
);

export default EmailListItem;
