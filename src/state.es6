import Baobab from 'baobab';

class StateStore {
    constructor() {
        this.tree = new Baobab();
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
}

export default new StateStore();
