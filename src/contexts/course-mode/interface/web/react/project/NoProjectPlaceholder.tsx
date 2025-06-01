export const NoProjectPlaceholder: React.FC = () => {
    return (
        <div className={'self-center mt-8'}>
            <h1 className={'text-p-70'}>
                No project selected.
            </h1>
            <p className={'text-p-70 text-center'}>
                Select existing project or add a new one.
            </p>
        </div>
    );
};
