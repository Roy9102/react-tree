/* 
* @Author:             Roy
* @Date:               2015-12-31 16:29:59
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-02 16:47:54
*/

'use strict';


import React, { Component, defaultProps, propTypes} from 'react';
import ReactDOM from 'react-dom';
import Checkbox from './checkbox.js';

const PADDING_LEFT_UNIT = 24;
const COLLAPSE_ICON = 'icon-square-minus';
const EXPAND_ICON = 'icon-square-plus';

export default class TreeNode extends Component {

	/**
	 * [propTypes 默认属性类型]
	 * @type {Object}
	 */
	static propTypes = {
		node:      React.PropTypes.object.isRequired,
		doExpand:  React.PropTypes.func,
		doActive:  React.PropTypes.func,
		doChecked: React.PropTypes.func
	};

	constructor(props){
		super(props);
		this.state = {
			isHover:  false,
			active: props.node.active
		};
		this.node            = props.node;
		this.doExpand        = this.doExpand.bind(this);
		this.doActive        = this.doActive.bind(this);
		this.mouseEnter      = this.mouseEnter.bind(this);
		this.mouseLeave      = this.mouseLeave.bind(this);
		this.onDelete        = this.onDelete.bind(this);
		this.getNodeControll = this.getNodeControll.bind(this);
	};


	/**
	 * [getClassAttr 根据节点属性生成节点CLASS]
	 * @return {[String]} [class字符串]
	 */
	getClassAttr(){
		var classes = ['tree_li'];
		if (this.state.isHover) classes.push('hover');
		if (this.node.active) classes.push('active');
		return classes.join(' ');
	}


	/**
	 * [getNodeControll 节点编辑按钮]
	 * @return {[DOM Node]} [按钮DOM元素]
	 */
	getNodeControll(){
		let {
			editable,
			deletable
		} = this.props.node;
		let editIcon = editable ? 'icon icon-compose' : null;
		let trashIcon = deletable ? 'icon icon-trash2' : null;
		if (this.state.isHover || this.node.active) {
			return(
				<span className="controlls">
					<i className={editIcon}></i>
					<i onClick = {this.onDelete} className={trashIcon}></i>
				</span>
			)
			
		};
	};


	/**
	 * [calcLevelPadding 根据节点Level计算层级缩进]
	 * @param  {[Number]} level [节点的层级]
	 * @return {[Object]}       [Style Object]
	 */
	calcLevelPadding(level){
		let paddingLeft = level * PADDING_LEFT_UNIT;
		return {
			paddingLeft
		}
	};


	/**
	 * [doExpand 展开节点]
	 * @param  {[Object]} event [event]
	 * @return {[null]}
	 */
	doExpand(event){
		event.stopPropagation();
		this.props.doExpand(this.node);
	}


	/**
	 * [doActive 选中节点]
	 * @param  {[Object]} event 
	 * @return {[null]}
	 */
	doActive(event){	
		event.stopPropagation();
		this.props.doActive(this.node);
	}


	/**
	 * [mouseEnter 设置节点的state:isHover为true]
	 * @return {[null]}
	 */
	mouseEnter(){
		this.setState({
			isHover:true
		})
	};


	/**
	 * [mouseLeave 设置节点的state:isHover为false]
	 * @return {[null]}
	 */
	mouseLeave(){
		this.setState({
			isHover:false
		})
	};


	/**
	 * [onDelete 删除节点句柄]
	 * @param  {[Object]} event [事件对象]
	 * @return {[null]}
	 */
	onDelete(event){
		event.stopPropagation();
		this.props.onDelete(this.node);
	};

	render(){
		let node = this.props.node;
		let {
			name,
			id,
			pid,
			level,
			isParent,
			checkbox,
			checked,
			halfChecked,
			expand,
			nodeIcon
		} = node;
		let expandIcon  = `icon ${ expand ? COLLAPSE_ICON : EXPAND_ICON } ${isParent ? '' : 'none'}`;		
		return (
			<li
				className    = {this.getClassAttr()}
				onMouseEnter = {this.mouseEnter}
				onMouseLeave = {this.mouseLeave} 
				onClick      = {this.doActive} 
				data-pid     = {pid} 
				data-gid     = {id}>

				<a style = {this.calcLevelPadding(level)} className = "tree_label">
					<i onClick = {isParent ? this.doExpand : null} className = {expandIcon}></i>
					{checkbox ? <Checkbox id = {id} onChange = {this.props.doChecked} checked = {checked} halfChecked = {halfChecked} /> : null}
					<i className = {`icon ${nodeIcon}`}></i>
					<span className = "node_name">{name}</span>
				</a>
				{this.getNodeControll()}
			</li>
		)
	};
};