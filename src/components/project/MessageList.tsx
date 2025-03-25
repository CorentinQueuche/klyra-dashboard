
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale/fr';
import { MessageSquare } from 'lucide-react';
import { Message } from '@/lib/types';

interface MessageListProps {
  messages: Message[];
  userId: string | undefined;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Aucun message pour le moment. Commencez la conversation !</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto mb-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex items-start space-x-2 ${
            message.sender_id === userId ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.sender_id !== userId && (
            <div className="w-8 h-8 rounded-full bg-klyra-100 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-klyra-500" />
            </div>
          )}
          <div className="max-w-[70%]">
            <div className={`p-3 rounded-lg ${
              message.sender_id === userId 
                ? 'bg-klyra-500 text-white' 
                : 'bg-muted'
            }`}>
              <div className="text-xs text-opacity-80 mb-1">
                {format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
          {message.sender_id === userId && (
            <div className="w-8 h-8 rounded-full bg-klyra-500 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
