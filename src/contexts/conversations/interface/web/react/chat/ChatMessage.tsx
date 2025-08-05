import { motion } from 'framer-motion';
import React from 'react';
import Markdown from 'react-markdown';
import { Message, Role } from '@/shared/entities/conversation';

const messageVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
};

export const AnimatedChatMessage: React.FC<{ message: Message }> = ({ message }) => (
    <motion.div
        className={'flex w-full'}
        variants={messageVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        transition={{ duration: 0.2, type: 'easeInOut' }}
        layout
    >
        <ChatMessage message={message} />
    </motion.div>
);

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const roleToContainer = {
        [Role.SYSTEM]: SystemMessage,
        [Role.ASSISTANT]: AssistantMessage,
        [Role.USER]: UserMessage,
    };

    const renderContent = () => {
        const { content } = message;

        if (!content || (Array.isArray(content) && content.length === 0)) {
            return message.role === Role.ASSISTANT ? <Spinner /> : null;
        }

        if (Array.isArray(content)) {
            return content.map((chunk, i) => (
                <AnimatedText key={i} content={chunk} />
            ));
        }
        return <Markdown>{content}</Markdown>;
    };

    const Container = roleToContainer[message.role];
    return <Container>{renderContent()}</Container>;
};

const SystemMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className='bg-p-90 text-p-50 px-5 py-3 rounded-[18px_18px_18px_18px] border-1 border-p-80 text-base shadow-sm mx-16'>
        <CollapsibleClamp>
            {children}
        </CollapsibleClamp>
    </div>;

const UserMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className={'max-w-[85%] ml-auto'}>
        <div className='bg-sd-70 text-p-10 px-5 py-3 rounded-[18px_18px_6px_18px] text-base shadow-sm shadow-black/20'>
            <CollapsibleClamp clampHeight={160} bgColor={'sd-70'}>
                {children}
            </CollapsibleClamp>
        </div>
    </div>;

const AssistantMessage: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className={'max-w-[85%] mr-auto'}>
        <div className='bg-p-90/30 px-5 py-2 rounded-[18px_18px_18px_6px] text-base shadow-sm shadow-black/20 border-1 border-p-70/30 my-1'>
            {children}
        </div>
    </div>;

const AnimatedText: React.FC<{ content: string }> = ({ content }) => (
    <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'easeIn' }}
    >
        {content}
    </motion.span>
);

const Spinner: React.FC = () => (
    <div className='w-6 h-6 border-2 border-p-50 border-t-transparent rounded-full animate-spin' />
);

export const CollapsibleClamp: React.FC<{
    children: React.ReactNode;
    clampHeight?: number;
    bgColor?: string;
}> = ({ children, clampHeight = 50, bgColor = 'p-90' }) => {
    const [open, setOpen] = React.useState(false);
    const [contentH, setContentH] = React.useState<number | null>(null);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        if (ref.current) {
            setContentH(ref.current.scrollHeight);
        }
    }, [children]);
    const expandedH = contentH ?? clampHeight;

    return (
        <motion.div
            className={'bg-inherit'}
            ref={ref}
            onClick={() => setOpen(v => !v)}
            initial={false}
            animate={{ maxHeight: open ? expandedH : clampHeight }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.1 }}
            style={{
                overflow: 'hidden',
                cursor: contentH && contentH > clampHeight ? 'pointer' : 'default',
                position: 'relative',
            }}
            aria-expanded={open}
        >
            {children}

            {!open && contentH && contentH > clampHeight && (
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-inherit z-10 [mask-image:linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,0))] [-webkit-mask-image:linear-gradient(to_top,rgba(0,0,0,1),rgba(0,0,0,0))]' />
            )}
        </motion.div>
    );
};
