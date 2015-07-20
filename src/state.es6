import Baobab from 'baobab';
import isEqual from 'lodash.isequal';

class State {
    constructor() {
        this.events = {};
        this.tree = new Baobab();
    }

    _createEventListener(event) {
        this.events[event] = {
            listener: e => {
                const currentPath = e.data.path;

                this.events[event].callbacks
                    .filter(
                        ({ path }) => isEqual(path, currentPath.slice(0, path.length))
                    )
                    .forEach(
                        ({ path, callback }) => callback(...currentPath.slice(path.length))
                    );
            },
            callbacks: []
        };

        this.tree.on(event, this.events[event].listener);
    }

    _removeEventListener(event) {
        // todo
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

        this.events[event].callbacks.push({ path, callback });
    }

    off(event, callback) {
        // todo
    }
}

export default new State();
