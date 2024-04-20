'use client';

import React from 'react';

interface EmailLinkProps {
  email: string;
}

export default function EmailLink({ email }: EmailLinkProps) {
  const gmailComposeUrl = `https://mail.google.com/mail/u/0/?view=cm&to=${encodeURIComponent(email)}`;

  return (
    <a
      href={gmailComposeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:text-blue-700"
    >
      {email}
    </a>
  );
}