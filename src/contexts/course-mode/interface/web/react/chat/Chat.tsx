import React, { useState } from 'react';
import { Conversation } from '@/shared/entities/conversation';
import { MessageView } from './MessageView';
import { PrimaryButton } from '@/shared/interface/web/react/components/primary-button';
import { PendingAssistantMessage } from '@/contexts/course-mode/interface/web/react/chat/PendingAssistantMessage';
import { handleNewUserMessage } from '@/contexts/course-mode/interface/controllers/course-mode-controller';

interface ChatProps {
    conversation: Conversation;
}

export function Chat({ conversation }: ChatProps) {
    const [message, setMessage] = useState('');
    const [currentConversation, setCurrentConversation] = useState<Conversation>(conversation);
    const [isGenerating, setIsGenerating] = useState(false);
    const [streamKey, setStreamKey] = useState(0);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!message.trim()) return;

        const updatedConversation = await handleNewUserMessage(currentConversation, message);
        setCurrentConversation(updatedConversation);
        setMessage('');
        setIsGenerating(true);
        setStreamKey(Date.now());
    };

    return (
        <section className='flex flex-1 h-full min-h-0 flex-col items-center'>
            <div className='flex-1 overflow-y-auto w-full custom-scrollbar'>
                <div className={'flex flex-1 max-w-[1000px] mx-auto'}>
                    <div className='flex flex-1'>
                        <MessageView
                            conversation={currentConversation}
                            isGenerating={isGenerating}
                        />
                        {isGenerating && (
                            <PendingAssistantMessage
                                key={streamKey}
                                conversation={currentConversation}
                                onConversationUpdate={setCurrentConversation}
                                onDone={() => setIsGenerating(false)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <MessageForm
                onSubmitAction={handleSubmit}
            >
                <MessageInput
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Ask about anything...'
                    disabled={isGenerating}
                />
                <PrimaryButton type='submit' disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Send'}
                </PrimaryButton>
            </MessageForm>
        </section>
    );
}

const MessageInput: React.FC< React.TextareaHTMLAttributes<HTMLTextAreaElement> > = ({ onKeyDown, className = '', ...rest }) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
            return;
        }
        onKeyDown?.(e);
    };

    return (
        <textarea
            {...rest}
            onKeyDown={handleKeyDown}
            rows={3}
            className={`
        flex-1 resize-none px-4 py-3 border border-p-70 rounded text-base
        bg-p-90 text-p-10 outline-none transition-all duration-200
        focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30
        ${className}
      `}
        />
    );
};

const MessageForm: React.FC<{
    onSubmitAction: (e: React.FormEvent) => void;
    children: React.ReactNode;
}> = ({ onSubmitAction, children }) => (
    <form
        onSubmit={onSubmitAction}
        className='flex w-full gap-4 p-4 py-10 max-w-[800px]'
    >
        {children}
    </form>
);
