import React from 'react';
import Reflux from 'reflux-edge';
import { render } from 'react-dom';
import { Link } from 'react-router';
import AlertActions from '../../../Actions/AlertActions.jsx';
import DatabasesActions from '../../../Actions/DatabasesActions.jsx';
import DatabasesStore from '../../../Stores/DatabasesStore.jsx';
import ConfirmModal from './ConfirmModal.jsx';

class NewDatabase extends Reflux.Component {

    constructor(props) {
        super(props);
        this.store = DatabasesStore; // required so the store will be initialized
        this.state = {
            dbname: '',
            timePrecision: 'ms',
            bufferSize: 1024,
            durationNum: '1w',
            durationLog: '1d',
            showConfirm: false
        };
    }

    onNewDatabase() {
        DatabasesActions.newDatabase(
            this.state.dbname,
            this.state.timePrecision,
            this.state.bufferSize,
            this.state.durationNum,
            this.state.durationLog,
            () => this.props.router.push('databases')
        );
    }

    onSave() {
        this.setState({showConfirm: true});
    }

    onYes() {
        this.onNewDatabase();
        this.setState({showConfirm: false});
    }

    onNo() {
        this.setState({showConfirm: false});
    }

    onDbnameChange(event) {
        AlertActions.clearAlert();
        this.setState({
            dbname: event.target.value
        });
    }

    onTimePrecisionChange(event) {
        AlertActions.clearAlert();
        this.setState({
            timePrecision: event.target.value
        });
    }

    onBufferSizeChange(event) {
        AlertActions.clearAlert();
        this.setState({
            bufferSize: event.target.value
        });
    }

    onDurationNumChange(event) {
        AlertActions.clearAlert();
        this.setState({
            durationNum: event.target.value
        });
    }

    onDurationLogChange(event) {
        AlertActions.clearAlert();
        this.setState({
            durationLog: event.target.value
        });
    }

    onKeyPress(event) {
        if (event.key == 'Enter') {
            this.onNewDatabase();
        }
    }

    render() {
        return (
            <div className="row">
                <h1>New database</h1>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="inp-dbname">Database name</label>
                        <div className="input-group input-group-sm">
                            <input
                                autoFocus
                                id="inp-dbname"
                                type="text"
                                className="form-control"
                                placeholder="database name"
                                value={this.state.dbname}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onDbnameChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inp-time-precision">Time precision</label>
                        <div className="input-group input-group-sm">
                            <select
                                id="inp-time-precision"
                                className="form-control"
                                value={this.state.timePrecision}
                                onChange={this.onTimePrecisionChange.bind(this)}>
                                <option value="s">second</option>
                                <option value="ms">millisecond</option>
                                <option value="us">microsecond</option>
                                <option value="ns">nanosecond</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inp-buffer-size">Buffer size</label>
                        <div className="input-group input-group-sm">
                            <input
                                id="inp-buffer-size"
                                type="number"
                                min="512"
                                max="10485760"
                                step="512"
                                className="form-control"
                                placeholder="buffer size (multiple of 512)"
                                value={this.state.bufferSize}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onBufferSizeChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inp-duration-num">Sharding duration (for numeric values)</label>
                        <div className="input-group input-group-sm">
                            <input
                                id="inp-duration-num"
                                type="text"
                                className="form-control"
                                placeholder="sharding duration e.g. 12h, 2d, 1w etc."
                                value={this.state.durationNum}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onDurationNumChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inp-duration-log">Sharding duration (for log values)</label>
                        <div className="input-group input-group-sm">
                            <input
                                id="inp-duration-log"
                                type="text"
                                className="form-control"
                                placeholder="sharding duration e.g. 12h, 2d, 1w etc."
                                value={this.state.durationLog}
                                onKeyPress={this.onKeyPress.bind(this)}
                                onChange={this.onDurationLogChange.bind(this)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group input-group-sm">
                            <button
                                className="btn btn-default"
                                type="button"
                                onClick={this.onSave.bind(this)}>Ok</button>
                            &nbsp;
                            <Link className="btn btn-cancel" to="databases">Cancel</Link>
                        </div>
                    </div>
                </div>
                <ConfirmModal
                    onYes={this.onYes.bind(this)}
                    onNo={this.onNo.bind(this)}
                    show={this.state.showConfirm} />
            </div>
        )
    }
}

export default NewDatabase;