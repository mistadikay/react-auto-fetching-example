import state from 'state';

export default function(Component) {
    return class DataWatcher extends Component {
        constructor(props) {
            super(props);

            this.cursors = {};
            this._initCursors(props);

            this.state = {
                ...this.state,
                data: this._getCurrentData()
            };

            this._updateData = this._updateData.bind(this);
        }

        componentDidMount() {
            if (super.componentDidMount) {
                super.componentDidMount();
            }

            this._updateData();
            this._dataWatch();
        }

        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }

            this._dataUnwatch();
        }

        _reloadData(props) {
            this._dataUnwatch();

            this._initCursors(props);
            this._updateData();

            this._dataWatch();
        }

        _resetData() {
            this._resetDataIn(Object.keys(this.cursors));
        }

        _resetDataIn(cursorsTypes) {
            cursorsTypes.forEach(cursorType => {
                const cursor = this.cursors[cursorType];

                if (cursor.exists()) {
                    cursor.unset();
                }
            });
            this._updateData();
        }

        _initCursors(props = this.props) {
            const cursorPaths = this.constructor.data(props, this.state);
            const stateTree = state.getTree();

            Object.keys(cursorPaths)
                .filter(branch => {
                    return cursorPaths[branch].every(pathChunk => typeof pathChunk !== 'undefined');
                })
                .forEach(branch => {
                    this.cursors[branch] = stateTree.select(cursorPaths[branch]);
                });
        }

        _dataWatch() {
            Object.keys(this.cursors).forEach(
                cursorType => this.cursors[cursorType].on('update', this._updateData)
            );
        }

        _dataUnwatch() {
            Object.keys(this.cursors).forEach(
                cursorType => this.cursors[cursorType].off('update', this._updateData)
            );
        }

        _getCurrentData() {
            const data = {};

            Object.keys(this.cursors).forEach(branch => {
                data[branch] = this.cursors[branch].get();
            });

            return data;
        }

        _updateData() {
            this.setState({
                data: this._getCurrentData()
            });
        }
    };
}
