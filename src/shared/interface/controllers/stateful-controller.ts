export type StateListener = () => void;

export abstract class StatefulController<T extends object> {
    private listeners = new Set<StateListener>();
    protected state: T | null = null;

    getState(): T | null {
        return this.state;
    }

    subscribe = (listener: StateListener) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };

    getSnapshot = (): T | null => {
        return this.getState();
    };

    protected emit() {
        for (const l of this.listeners) {
            l();
        }
    }
}
