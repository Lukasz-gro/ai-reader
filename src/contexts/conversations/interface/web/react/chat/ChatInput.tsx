import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { conversationController } from '@/contexts/conversations/interface/controllers/conversation-controller';
import { Conversation } from '@/shared/entities/conversation';
import { PushButton } from '@/shared/interface/web/react/components/push-button';
import { ArrowUpIcon } from 'lucide-react';
import { useActiveProjectId, useRequireProjectId } from '@/shared/interface/web/react/project/hooks/useActiveProjectId';


export const MessageInput: React.FC< React.TextareaHTMLAttributes<HTMLTextAreaElement> & { blocked: boolean }> = ({ blocked, onKeyDown, className = '', ...rest }) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
        if (blocked) { return; }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
            return;
        }
        onKeyDown?.(e);
    };

    return (
        <div className='flex flex-1 rounded-[22px] p-[2px] bg-gradient-to-b from-sd-70 to-sd-60'>
            <div className='flex flex-1 rounded-[20px] bg-p-90'>
                <textarea
                    {...rest}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    className={`
                flex-1 resize-none px-4 py-3 rounded-[20px] text-base
                bg-p-90 text-p-10 outline-none transition-all duration-200
                focus:border-sd-50 focus:shadow-md focus:shadow-sd-50/30
                ${className}
              `}
                />
            </div>
        </div>
    );
};

interface ChatInputProps {
    conversation: Conversation | null;
    setConversation: (c: Conversation) => void;
    generating: boolean;
    setGenerating: (g: boolean) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ conversation, setConversation, generating, setGenerating, }) => {
    const [text, setText] = useState('');
    const [busy, setBusy] = useState(false);

    const projectId = useActiveProjectId();
    useRequireProjectId(projectId);

    const submit = useCallback(
        async (e?: React.FormEvent) => {
            if (e) e.preventDefault();
            if (!text.trim() || busy) return;

            setBusy(true);
            try {
                let updated: Conversation;
                if (!conversation) {
                    updated = await conversationController.handleStartNewConversation(projectId, 'course', text.trim());
                } else {
                    updated = await conversationController.handleNewUserMessage(conversation, text.trim());
                }
                setText('');
                setConversation(updated);
                setGenerating(true);
            } finally {
                setBusy(false);
            }
        },
        [text, busy, conversation, setConversation, setGenerating, projectId]
    );

    return (
        <motion.form
            layout
            onSubmit={submit}
            className='relative flex w-full max-w-[800px] mx-auto p-4 py-6'
        >
            <MessageInput
                blocked={busy || generating}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Say something…'
                className='flex-1 pr-16'
            />

            <PushButton
                type='submit'
                disabled={busy || generating}
                className='ml-4 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50'
            >
                <ArrowUpIcon className='h-5 w-5'/>
            </PushButton>
        </motion.form>
    );
};
