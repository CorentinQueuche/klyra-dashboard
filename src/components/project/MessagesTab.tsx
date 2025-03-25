
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AnimatedCard from '@/components/motion/AnimatedCard';
import MessageList from './MessageList';
import { Message } from '@/lib/types';

interface MessagesTabProps {
  messages: Message[];
  userId: string | undefined;
  onSendMessage: (content: string) => Promise<void>;
  isSending: boolean;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ 
  messages, 
  userId, 
  onSendMessage,
  isSending 
}) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    try {
      await onSendMessage(newMessage.trim());
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <AnimatedCard>
      <Card className="glass-card">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Messages</h3>
          <div className="flex flex-col h-[400px]">
            <MessageList messages={messages} userId={userId} />
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                disabled={isSending}
              />
              <Button 
                type="submit" 
                disabled={!newMessage.trim() || isSending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default MessagesTab;
