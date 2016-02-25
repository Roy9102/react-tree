/* 
* @Author:             Roy
* @Date:               2016-01-15 14:30:50
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-01 11:06:43
*/

import React, {Component, defaultProps, propTypes} from 'react';


export default class Checkbox extends Component {

	static defaultProps = {
		checked:     false,
		halfChecked: false
	};

	static propTypes = {
		checked:     React.PropTypes.bool.isRequired,
		halfChecked: React.PropTypes.bool.isRequired,
		onChange:    React.PropTypes.func.isRequired,
		id:          React.PropTypes.number.isRequired,
		name:        React.PropTypes.string
	};

	constructor(props){
		super(props);

		this.state = {
			checked:     props.checked,
			halfChecked: props.halfChecked
		}

		this.changeState = this.changeState.bind(this);
		this.halfCheck   = this.halfCheck.bind(this);
	};

	halfCheck(halfchk){
		this.refs.checkbox.indeterminate = halfchk;
		this.setState({
			checked:     false,
			halfChecked: halfchk
		})
	}

	
	componentWillReceiveProps (nextProps) {
		
		if (this.props.checked !== nextProps.checked || this.props.halfChecked !== nextProps.halfChecked) {
			
			this.setState({
				checked:     nextProps.checked,
				halfChecked: nextProps.halfChecked
			});
		}
	}

	changeState(e){
		e.stopPropagation();
		this.setState({
			checked:     e.target.checked,
			halfChecked: false
		});
		this.props.onChange(e.target.checked,this.props.id)
		
	};

	onClick(e){
		e.stopPropagation();
		return false;
	};
	

	render (){
		let state = this.state.checked ? "icon-check_box" : (this.state.halfChecked ? "icon-indeterminate_check_box" : "icon-check_box_outline_blank");
		let className = `checkbox icon ${state}`;
		return (
			<span onClick={this.onClick} className={className}>
				<input onChange={this.changeState} ref="checkbox" checked={this.state.checked} type="checkbox" className="hidden" name={this.props.name}  />
			</span>
		)
	}

}