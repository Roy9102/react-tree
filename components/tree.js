/* 
* @Author:             Roy
* @Date:               2015-12-31 14:36:19
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-02 17:23:57
*/

'use strict';

import React, {defaultProps, propTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TreeNode from './treenode.js';


class Tree extends Component {

	/**
	 * [defaultProps 默认属性]
	 * @type {Object}
	 */
	static defaultProps = {
	    rawTreeData:   [],
	    config: {
		    expandLevel:     1,
		    initialActiveID: 0,
		    editable:        true,
		    deletable:       true,
		    multiSelect:     true,
		    initChecked:     [2155,2154,2158]
		}
	};

	/**
	 * [propTypes 属性类型]
	 * @type {Object}
	 */
	static propTypes = {
		rawTreeData: React.PropTypes.array.isRequired,
		config:React.PropTypes.shape({
			expandLevel:     React.PropTypes.number,
		    initialActiveID: React.PropTypes.number,
		    editable:        React.PropTypes.bool,
		    deletable:       React.PropTypes.bool,
		    multiSelect:     React.PropTypes.bool,
		    initChecked:     React.PropTypes.arrayOf(React.PropTypes.number)
		})
	};

	constructor(props){
		super(props);
		const rawData   = props.rawTreeData;
		this.config     = props.config;
		this.doChecked  = this.doChecked.bind(this);
		this.doActive   = this.doActive.bind(this);
		this.doExpand   = this.doExpand.bind(this);
		this.onAddGroup = this.onAddGroup.bind(this);
		this.onDelete   = this.onDelete.bind(this);

		this.list = [];
		let checkedArray = this.config.initChecked ? this.config.initChecked : [];
		let tree  = this._generatorTree(rawData);
		this.getTreeList(this.list,tree, true);
		this.state = {
			tree:         tree,
			activeID:     this.config.initialActiveID,
			checkedArray: checkedArray
		};
	};


	/**
	 * [_findChildren 递归函数，根据服务端的数组生成树型数据结构]
	 * @param  {[Array]}  rawData  [服务端传入的数组]
	 * @param  {[Object]} root     [父节点，由根节点开始递归]
	 * @param  {[Array]}  children [子节点数组]
	 * @return {[null]}     
	 */
	_findChildren(rawData, root, children){		
		
		root.checkbox  = this.config.multiSelect  	// 是否显示CHECKBOX
		root.editable  = this.config.editable;		// 是否允许编辑
		root.deletable = this.config.deletable		// 是否允许删除


		rawData.forEach( (element, index) => {
			if (element.pid === root.id){
				element.level    = root.level + 1;
				children.push(element);
				root.children = children;
				this._findChildren(rawData, element, []);
			};
		});
		if ( children && children.length ) {
			root.nodeIcon = this.config.groupIcon;
			root.children = children;
			root.isParent = true;
			root.expand = root.level < this.config.expandLevel;
		}else{
			root.nodeIcon = this.config.childIcon;
		}

	};

	/**
	 * [_generatorTree 返回树型结构]
	 * @param  {[type]} rawData [服务端传入的数组]
	 * @return {[Object]}         [根节点]
	 */
	_generatorTree(rawData){
		let rootNode   = {
			name: "全网计算机",
			id:0,
			level:0,
			isRoot:true,
			has_permit:true,
		};
		rawData.unshift(rootNode);
		this._findChildren(rawData, rootNode, []);
		return rootNode;
	};

	/**
	 * [getTreeList 根据树型数据结构生成节点列表]
	 * @param  {[Array]} list     [节点列表]
	 * @param  {[Objec]} root     [节点]
	 * @param  {[bool]} visible   [节点是否可见]
	 * @return {[null]}
	 */
	getTreeList(list, root, visible){
		let _this     = this;
		root.visible  = visible;
		list[root.id] = root;
		if (root.isParent){
			let _results = [];
			root.children.forEach( (child,i) => {
				let child_visible = visible && root.expand;
				_results.push(_this.getTreeList(list,child, child_visible))
			})
			return _results;
		}
	};


	/**
	 * [ChildCheckedStatus 检查子节点的选中情况]
	 * @param {[Array]} children [子节点数组]
	 */
	ChildCheckedStatus(children){
		let checked = true;
		let halfChecked = false;
		children.map( (child, index)=> {
			if (child.halfChecked || child.checked){
				halfChecked = true;
			}else if (!child.checked){
			  	checked = false;
			}
		})
		return {
			checked,
			halfChecked
		};
	};

	/**
	 * [setParentCheckStatus 递归设置父节点checkbox状态]
	 * @param {[number]} pid [父节点的ID]
	 */
	setParentCheckStatus(pid){
		let list   = this.list;
		let parent = list[pid];
		if (parent){
			parent = Object.assign(parent,this.ChildCheckedStatus(parent.children)); 
			if (typeof(parent.pid) != 'undefined') this.setParentCheckStatus(parent.pid);
		}
	};


	/**
	 * [setChildrenCheckStatus 设置子节点的checkbox状态]
	 * @param {[Array]} children [子节点数组]
	 * @param {[bool]}  checked  [checkbox状态]
	 */
	setChildrenCheckStatus(children,checked){
		children.map( (child, index) => {
			child.checked     = checked;
			child.halfChecked = false;
			if (child.isParent) this.setChildrenCheckStatus(child.children,checked);
		})
	};


	/**
	 * [setCheckChainReaction 设置checkbox联动]
	 * @param {[Object]} node [节点对象]
	 */
	setCheckChainReaction(node){
		const checked = node.checked;
		if (node.isParent) this.setChildrenCheckStatus(node.children,checked);
		if (typeof(node.pid) != 'undefined') this.setParentCheckStatus(node.pid);
	};


	ToggleExpand(node,expand){
		node.expand = expand;
		if ( node.isParent ){
			node.children.map( (c,i) => {
				c.visible = node.expand;
				if (c.isParent) this.ToggleExpand(c,false)
			})
		} 
	}
	/**
	 * [doExpand 展开当前节点]
	 * @param  {[Object]} node [当前节点对象]
	 * @return {[null]}
	 */
	doExpand(node){
		let list = this.list;
		let tree = this.state.tree;
		this.ToggleExpand(node,!node.expand)
		list[node.id] = node;
		this.setState({
			tree:tree
		})
	};


	/**
	 * [doActive 选中当前节点]
	 * @param  {[Object]} node 		[当前节点对象]
	 * @return {[null]}
	 */
	doActive(node){
		let list       = this.list;
		let tree       = this.state.tree;
		const onActive = this.config.onActive;
		this.setState({
			activeID:node.id
		})
		if (onActive && typeof(onActive) === 'function'){
			onActive(node);
		}
	};


	/**
	 * [doChecked 选中checkbox]
	 * @param  {[bool]} 	checked [checkbox状态]
	 * @param  {[number]} 	id      [节点ID]
	 * @return {[null]}
	 */
	doChecked(checked,id){
		let list         = this.list;
		let tree         = this.state.tree;
		let node         = list[id];
		node.checked     = checked;
		node.halfChecked = false;
		this.setCheckChainReaction(node);
		this.setState({
			tree:tree
		})
	};

	/**
	 * [onAddGroup 添加分组点击事件handler]
	 * @return {[null]}
	 */
 	onAddGroup(){
 		const activeID = this.state.activeID;
 		this._insertGroup(activeID,{
			"id": 3000,
			"name": "new_one",
			"status": 1,
			"create_time": "2015-08-27 16:06:23.974555",
			"description": null,
			"modify_time": "2015-08-27 16:06:23.974555",
			"sort_id": null,
			"ip_filter": 1,
			"lock": 0,
			"cli_cnt": 0,
			"display_name": "new_one",
			"has_permit": true
		});
 	}


 	onDelete(node){
 		console.log(node)
 		let tree = this.state.tree;
 		// const beforeDelete = this.config.beforeDelete;
		if ( typeof(beforeDelete) === 'function' ){
			beforeDelete().done( () => {
				console.log(`delete node ${node.id}`);
			})
		}else{
			this.list[node.id].visible = false;
			this.setState({
				tree:tree
			})
		}
 	}

	/**
	 * [_insertGroup 插入分组]
	 * @param  {[number]} pid     [所要插入的父分组ID，默认为当前选中的分组]
	 * @param  {[Object]} newNode [要插入新的节点对象]
	 * @return {[null]}
	 */
	_insertGroup(pid,newNode){
 		if (Number.isNaN(pid)) pid = this.state.activeID;
		let tree = this.state.tree;
 		let list = this.list;
 		let parent = list[pid];
		let fresher = Object.assign(newNode,{
			pid:parent.id,
			level:parent.level+1,
			checkbox:parent.checkbox,
			checked:parent.checked,
			visible:parent.expand,
		})
		
		if (parent.isParent){
			parent.children.push(fresher);
		}else{
			parent.isParent = true;
			parent.children = [fresher];
		}
		if (!parent.expand){
			this.doExpand(parent);
		}else{
			this.setState({
				tree:tree
			})
		}

	}


	/**
	 * [renderLiList 根据列表生成树节点li列表]
	 * @return {[TreeNode Array]} [TreeNode 节点列表]
	 */
	renderLiList(li_list, root){
 		if (root.visible){
 			root.active = this.state.activeID === root.id;

			li_list.push(
				<TreeNode
					ref       = {`gid_${root.id}`} 
					key       = {root.id}
					doExpand  = {this.doExpand}
					doActive  = {this.doActive}
					doChecked = {this.doChecked}
					onDelete  = {this.onDelete}
					node      = {root} />
			);
			if (root.isParent){
				root.children.map( (child, index) =>{
					this.renderLiList(li_list, child);
				} )
			}
		}		
	};

	componentWillMount(){
		if (this.config.multiSelect){
			let list = this.list;
			this.state.checkedArray.map( (id, index) => {	//初始化的选中的子节点
				let node = list[id];
				node.checked     = true;
				node.halfChecked = false;
				this.setCheckChainReaction(node);
			})	 		
	 	}
 	}

	render(){
		let li_list = [];
		let tree = this.state.tree;
		this.renderLiList(li_list,tree);
		return(
			<div className = "react_tree">
				<h2 className = "tree_title">
					<i className = "icon-feather"></i>
					{this.props.title}
				</h2>
				<ul className = "tree_box">
					<ReactCSSTransitionGroup transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionName="slide">
						{li_list}
					</ReactCSSTransitionGroup>
				</ul>
				{/*<p>
					<button onClick={this.onAddGroup} className="button btn-large">新建分组</button>
					<button onClick={this.onAddGroup} className="button btn-large">新建分组</button>
				</p>*/}
			</div>
		)
	};

};

export default Tree;