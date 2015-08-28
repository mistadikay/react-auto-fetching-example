import Baobab from 'baobab';
import isEqual from 'lodash.isequal';

class State {
    constructor() {
        this.tree = new Baobab();
        this.events = {};
        this.waitingCursors = [];
    }

    _createEventListener(event) {
        this.events[event] = {
            listener: e => {
                const currentPath = e.data.path;
                const existingData = e.data.data;

                if (!existingData) {
                    this.events[event].callbacks
                        .filter(
                            ({ path }) => isEqual(path, currentPath.slice(0, path.length))
                        )
                        .forEach(
                            ({ path, callback }) => callback(...currentPath.slice(path.length))
                        );
                }
            },
            callbacks: []
        };

        this.tree.on(event, this.events[event].listener);
    }

    _removeEventListener(event) {
        // todo
    }

    addWaitingCursor(cursor) {
        this.waitingCursors.push(cursor);
    }

    get() {
        return this.tree.get();
    }

    getIn(cursorPath) {
        return this.tree.get(cursorPath);
    }

    set(data) {
        this.tree.set(data);
    }

    setIn(cursorPath, data) {
        this.tree.set(cursorPath, data);
    }

    getTree() {
        return this.tree;
    }

    on(event, path, callback) {
        if (!this.events[event]) {
            this._createEventListener(event);
        }

        this.waitingCursors.forEach(waitingCursor => {
            const waitingPath = waitingCursor.path;

            if (
                isEqual(path, waitingPath.slice(0, path.length)) &&
                !this.tree.select(waitingPath).exists()
            ) {
                return callback(...waitingPath.slice(path.length));
            }
        });

        this.events[event].callbacks.push({ path, callback });
    }

    off(event, callback) {
        // todo
    }
}

export default new State();
