(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-addons-css-transition-group"));
	else if(typeof define === 'function' && define.amd)
		define("react-tree", ["react", "react-addons-css-transition-group"], factory);
	else if(typeof exports === 'object')
		exports["react-tree"] = factory(require("./node_modules")["react"], require("./node_modules")["react-addons-css-transition-group"]);
	else
		root["react-tree"] = factory(root["react"], root["react-addons-css-transition-group"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	* @Author:             Roy
	* @Date:               2015-12-31 14:36:19
	* @Description:        
	* @Email:              chenxuezhong@360.cn
	* @Last Modified by:   Roy
	* @Last Modified time: 2016-02-02 17:23:57
	*/
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsCssTransitionGroup = __webpack_require__(8);
	
	var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);
	
	var _treenode = __webpack_require__(9);
	
	var _treenode2 = _interopRequireDefault(_treenode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tree = function (_Component) {
		_inherits(Tree, _Component);
	
		/**
	  * [defaultProps 默认属性]
	  * @type {Object}
	  */
	
		function Tree(props) {
			_classCallCheck(this, Tree);
	
			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).call(this, props));
	
			var rawData = props.rawTreeData;
			_this2.config = props.config;
			_this2.doChecked = _this2.doChecked.bind(_this2);
			_this2.doActive = _this2.doActive.bind(_this2);
			_this2.doExpand = _this2.doExpand.bind(_this2);
			_this2.onAddGroup = _this2.onAddGroup.bind(_this2);
			_this2.onDelete = _this2.onDelete.bind(_this2);
	
			_this2.list = [];
			var checkedArray = _this2.config.initChecked ? _this2.config.initChecked : [];
			var tree = _this2._generatorTree(rawData);
			_this2.getTreeList(_this2.list, tree, true);
			_this2.state = {
				tree: tree,
				activeID: _this2.config.initialActiveID,
				checkedArray: checkedArray
			};
			return _this2;
		}
	
		/**
	  * [propTypes 属性类型]
	  * @type {Object}
	  */
	
		_createClass(Tree, [{
			key: '_findChildren',
	
			/**
	   * [_findChildren 递归函数，根据服务端的数组生成树型数据结构]
	   * @param  {[Array]}  rawData  [服务端传入的数组]
	   * @param  {[Object]} root     [父节点，由根节点开始递归]
	   * @param  {[Array]}  children [子节点数组]
	   * @return {[null]}     
	   */
			value: function _findChildren(rawData, root, children) {
				var _this3 = this;
	
				root.checkbox = this.config.multiSelect; // 是否显示CHECKBOX
				root.editable = this.config.editable; // 是否允许编辑
				root.deletable = this.config.deletable; // 是否允许删除
	
				rawData.forEach(function (element, index) {
					if (element.pid === root.id) {
						element.level = root.level + 1;
						children.push(element);
						root.children = children;
						_this3._findChildren(rawData, element, []);
					};
				});
				if (children && children.length) {
					root.nodeIcon = this.config.groupIcon;
					root.children = children;
					root.isParent = true;
					root.expand = root.level < this.config.expandLevel;
				} else {
					root.nodeIcon = this.config.childIcon;
				}
			}
		}, {
			key: '_generatorTree',
	
			/**
	   * [_generatorTree 返回树型结构]
	   * @param  {[type]} rawData [服务端传入的数组]
	   * @return {[Object]}         [根节点]
	   */
			value: function _generatorTree(rawData) {
				var rootNode = {
					name: "全网计算机",
					id: 0,
					level: 0,
					isRoot: true,
					has_permit: true
				};
				rawData.unshift(rootNode);
				this._findChildren(rawData, rootNode, []);
				return rootNode;
			}
		}, {
			key: 'getTreeList',
	
			/**
	   * [getTreeList 根据树型数据结构生成节点列表]
	   * @param  {[Array]} list     [节点列表]
	   * @param  {[Objec]} root     [节点]
	   * @param  {[bool]} visible   [节点是否可见]
	   * @return {[null]}
	   */
			value: function getTreeList(list, root, visible) {
				var _this = this;
				root.visible = visible;
				list[root.id] = root;
				if (root.isParent) {
					var _ret = function () {
						var _results = [];
						root.children.forEach(function (child, i) {
							var child_visible = visible && root.expand;
							_results.push(_this.getTreeList(list, child, child_visible));
						});
						return {
							v: _results
						};
					}();
	
					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
			}
		}, {
			key: 'ChildCheckedStatus',
	
			/**
	   * [ChildCheckedStatus 检查子节点的选中情况]
	   * @param {[Array]} children [子节点数组]
	   */
			value: function ChildCheckedStatus(children) {
				var checked = true;
				var halfChecked = false;
				children.map(function (child, index) {
					if (child.halfChecked || child.checked) {
						halfChecked = true;
					} else if (!child.checked) {
						checked = false;
					}
				});
				return {
					checked: checked,
					halfChecked: halfChecked
				};
			}
		}, {
			key: 'setParentCheckStatus',
	
			/**
	   * [setParentCheckStatus 递归设置父节点checkbox状态]
	   * @param {[number]} pid [父节点的ID]
	   */
			value: function setParentCheckStatus(pid) {
				var list = this.list;
				var parent = list[pid];
				if (parent) {
					parent = Object.assign(parent, this.ChildCheckedStatus(parent.children));
					if (typeof parent.pid != 'undefined') this.setParentCheckStatus(parent.pid);
				}
			}
		}, {
			key: 'setChildrenCheckStatus',
	
			/**
	   * [setChildrenCheckStatus 设置子节点的checkbox状态]
	   * @param {[Array]} children [子节点数组]
	   * @param {[bool]}  checked  [checkbox状态]
	   */
			value: function setChildrenCheckStatus(children, checked) {
				var _this4 = this;
	
				children.map(function (child, index) {
					child.checked = checked;
					child.halfChecked = false;
					if (child.isParent) _this4.setChildrenCheckStatus(child.children, checked);
				});
			}
		}, {
			key: 'setCheckChainReaction',
	
			/**
	   * [setCheckChainReaction 设置checkbox联动]
	   * @param {[Object]} node [节点对象]
	   */
			value: function setCheckChainReaction(node) {
				var checked = node.checked;
				if (node.isParent) this.setChildrenCheckStatus(node.children, checked);
				if (typeof node.pid != 'undefined') this.setParentCheckStatus(node.pid);
			}
		}, {
			key: 'ToggleExpand',
			value: function ToggleExpand(node, expand) {
				var _this5 = this;
	
				node.expand = expand;
				if (node.isParent) {
					node.children.map(function (c, i) {
						c.visible = node.expand;
						if (c.isParent) _this5.ToggleExpand(c, false);
					});
				}
			}
			/**
	   * [doExpand 展开当前节点]
	   * @param  {[Object]} node [当前节点对象]
	   * @return {[null]}
	   */
	
		}, {
			key: 'doExpand',
			value: function doExpand(node) {
				var list = this.list;
				var tree = this.state.tree;
				this.ToggleExpand(node, !node.expand);
				list[node.id] = node;
				this.setState({
					tree: tree
				});
			}
		}, {
			key: 'doActive',
	
			/**
	   * [doActive 选中当前节点]
	   * @param  {[Object]} node 		[当前节点对象]
	   * @return {[null]}
	   */
			value: function doActive(node) {
				var list = this.list;
				var tree = this.state.tree;
				var onActive = this.config.onActive;
				this.setState({
					activeID: node.id
				});
				if (onActive && typeof onActive === 'function') {
					onActive(node);
				}
			}
		}, {
			key: 'doChecked',
	
			/**
	   * [doChecked 选中checkbox]
	   * @param  {[bool]} 	checked [checkbox状态]
	   * @param  {[number]} 	id      [节点ID]
	   * @return {[null]}
	   */
			value: function doChecked(checked, id) {
				var list = this.list;
				var tree = this.state.tree;
				var node = list[id];
				node.checked = checked;
				node.halfChecked = false;
				this.setCheckChainReaction(node);
				this.setState({
					tree: tree
				});
			}
		}, {
			key: 'onAddGroup',
	
			/**
	   * [onAddGroup 添加分组点击事件handler]
	   * @return {[null]}
	   */
			value: function onAddGroup() {
				var activeID = this.state.activeID;
				this._insertGroup(activeID, {
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
		}, {
			key: 'onDelete',
			value: function onDelete(node) {
				console.log(node);
				var tree = this.state.tree;
				// const beforeDelete = this.config.beforeDelete;
				if (typeof beforeDelete === 'function') {
					beforeDelete().done(function () {
						console.log('delete node ' + node.id);
					});
				} else {
					this.list[node.id].visible = false;
					this.setState({
						tree: tree
					});
				}
			}
	
			/**
	   * [_insertGroup 插入分组]
	   * @param  {[number]} pid     [所要插入的父分组ID，默认为当前选中的分组]
	   * @param  {[Object]} newNode [要插入新的节点对象]
	   * @return {[null]}
	   */
	
		}, {
			key: '_insertGroup',
			value: function _insertGroup(pid, newNode) {
				if (Number.isNaN(pid)) pid = this.state.activeID;
				var tree = this.state.tree;
				var list = this.list;
				var parent = list[pid];
				var fresher = Object.assign(newNode, {
					pid: parent.id,
					level: parent.level + 1,
					checkbox: parent.checkbox,
					checked: parent.checked,
					visible: parent.expand
				});
	
				if (parent.isParent) {
					parent.children.push(fresher);
				} else {
					parent.isParent = true;
					parent.children = [fresher];
				}
				if (!parent.expand) {
					this.doExpand(parent);
				} else {
					this.setState({
						tree: tree
					});
				}
			}
	
			/**
	   * [renderLiList 根据列表生成树节点li列表]
	   * @return {[TreeNode Array]} [TreeNode 节点列表]
	   */
	
		}, {
			key: 'renderLiList',
			value: function renderLiList(li_list, root) {
				var _this6 = this;
	
				if (root.visible) {
					root.active = this.state.activeID === root.id;
	
					li_list.push(_react2.default.createElement(_treenode2.default, {
						ref: 'gid_' + root.id,
						key: root.id,
						doExpand: this.doExpand,
						doActive: this.doActive,
						doChecked: this.doChecked,
						onDelete: this.onDelete,
						node: root }));
					if (root.isParent) {
						root.children.map(function (child, index) {
							_this6.renderLiList(li_list, child);
						});
					}
				}
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this7 = this;
	
				if (this.config.multiSelect) {
					(function () {
						var list = _this7.list;
						_this7.state.checkedArray.map(function (id, index) {
							//初始化的选中的子节点
							var node = list[id];
							node.checked = true;
							node.halfChecked = false;
							_this7.setCheckChainReaction(node);
						});
					})();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var li_list = [];
				var tree = this.state.tree;
				this.renderLiList(li_list, tree);
				return _react2.default.createElement(
					'div',
					{ className: 'react_tree' },
					_react2.default.createElement(
						'h2',
						{ className: 'tree_title' },
						_react2.default.createElement('i', { className: 'icon-feather' }),
						this.props.title
					),
					_react2.default.createElement(
						'ul',
						{ className: 'tree_box' },
						_react2.default.createElement(
							_reactAddonsCssTransitionGroup2.default,
							{ transitionEnterTimeout: 500, transitionLeaveTimeout: 500, transitionName: 'slide' },
							li_list
						)
					)
				);
			}
		}]);
	
		return Tree;
	}(_react.Component);
	
	Tree.defaultProps = {
		rawTreeData: [],
		config: {
			expandLevel: 1,
			initialActiveID: 0,
			editable: true,
			deletable: true,
			multiSelect: true,
			initChecked: [2155, 2154, 2158]
		}
	};
	Tree.propTypes = {
		rawTreeData: _react2.default.PropTypes.array.isRequired,
		config: _react2.default.PropTypes.shape({
			expandLevel: _react2.default.PropTypes.number,
			initialActiveID: _react2.default.PropTypes.number,
			editable: _react2.default.PropTypes.bool,
			deletable: _react2.default.PropTypes.bool,
			multiSelect: _react2.default.PropTypes.bool,
			initChecked: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number)
		})
	};
	exports.default = Tree;
	;

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	/* 
	* @Author:             Roy
	* @Date:               2015-12-31 16:29:59
	* @Description:        
	* @Email:              chenxuezhong@360.cn
	* @Last Modified by:   Roy
	* @Last Modified time: 2016-02-02 16:47:54
	*/
	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _checkbox = __webpack_require__(10);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PADDING_LEFT_UNIT = 24;
	var COLLAPSE_ICON = 'icon-square-minus';
	var EXPAND_ICON = 'icon-square-plus';
	
	var TreeNode = function (_Component) {
		_inherits(TreeNode, _Component);
	
		function TreeNode(props) {
			_classCallCheck(this, TreeNode);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNode).call(this, props));
	
			_this.state = {
				isHover: false,
				active: props.node.active
			};
			_this.node = props.node;
			_this.doExpand = _this.doExpand.bind(_this);
			_this.doActive = _this.doActive.bind(_this);
			_this.mouseEnter = _this.mouseEnter.bind(_this);
			_this.mouseLeave = _this.mouseLeave.bind(_this);
			_this.onDelete = _this.onDelete.bind(_this);
			_this.getNodeControll = _this.getNodeControll.bind(_this);
			return _this;
		}
	
		/**
	  * [propTypes 默认属性类型]
	  * @type {Object}
	  */
	
		_createClass(TreeNode, [{
			key: 'getClassAttr',
	
			/**
	   * [getClassAttr 根据节点属性生成节点CLASS]
	   * @return {[String]} [class字符串]
	   */
			value: function getClassAttr() {
				var classes = ['tree_li'];
				if (this.state.isHover) classes.push('hover');
				if (this.node.active) classes.push('active');
				return classes.join(' ');
			}
	
			/**
	   * [getNodeControll 节点编辑按钮]
	   * @return {[DOM Node]} [按钮DOM元素]
	   */
	
		}, {
			key: 'getNodeControll',
			value: function getNodeControll() {
				var _props$node = this.props.node;
				var editable = _props$node.editable;
				var deletable = _props$node.deletable;
	
				var editIcon = editable ? 'icon icon-compose' : null;
				var trashIcon = deletable ? 'icon icon-trash2' : null;
				if (this.state.isHover || this.node.active) {
					return _react2.default.createElement(
						'span',
						{ className: 'controlls' },
						_react2.default.createElement('i', { className: editIcon }),
						_react2.default.createElement('i', { onClick: this.onDelete, className: trashIcon })
					);
				};
			}
		}, {
			key: 'calcLevelPadding',
	
			/**
	   * [calcLevelPadding 根据节点Level计算层级缩进]
	   * @param  {[Number]} level [节点的层级]
	   * @return {[Object]}       [Style Object]
	   */
			value: function calcLevelPadding(level) {
				var paddingLeft = level * PADDING_LEFT_UNIT;
				return {
					paddingLeft: paddingLeft
				};
			}
		}, {
			key: 'doExpand',
	
			/**
	   * [doExpand 展开节点]
	   * @param  {[Object]} event [event]
	   * @return {[null]}
	   */
			value: function doExpand(event) {
				event.stopPropagation();
				this.props.doExpand(this.node);
			}
	
			/**
	   * [doActive 选中节点]
	   * @param  {[Object]} event 
	   * @return {[null]}
	   */
	
		}, {
			key: 'doActive',
			value: function doActive(event) {
				event.stopPropagation();
				this.props.doActive(this.node);
			}
	
			/**
	   * [mouseEnter 设置节点的state:isHover为true]
	   * @return {[null]}
	   */
	
		}, {
			key: 'mouseEnter',
			value: function mouseEnter() {
				this.setState({
					isHover: true
				});
			}
		}, {
			key: 'mouseLeave',
	
			/**
	   * [mouseLeave 设置节点的state:isHover为false]
	   * @return {[null]}
	   */
			value: function mouseLeave() {
				this.setState({
					isHover: false
				});
			}
		}, {
			key: 'onDelete',
	
			/**
	   * [onDelete 删除节点句柄]
	   * @param  {[Object]} event [事件对象]
	   * @return {[null]}
	   */
			value: function onDelete(event) {
				event.stopPropagation();
				this.props.onDelete(this.node);
			}
		}, {
			key: 'render',
			value: function render() {
				var node = this.props.node;
				var name = node.name;
				var id = node.id;
				var pid = node.pid;
				var level = node.level;
				var isParent = node.isParent;
				var checkbox = node.checkbox;
				var checked = node.checked;
				var halfChecked = node.halfChecked;
				var expand = node.expand;
				var nodeIcon = node.nodeIcon;
	
				var expandIcon = 'icon ' + (expand ? COLLAPSE_ICON : EXPAND_ICON) + ' ' + (isParent ? '' : 'none');
				return _react2.default.createElement(
					'li',
					{
						className: this.getClassAttr(),
						onMouseEnter: this.mouseEnter,
						onMouseLeave: this.mouseLeave,
						onClick: this.doActive,
						'data-pid': pid,
						'data-gid': id },
					_react2.default.createElement(
						'a',
						{ style: this.calcLevelPadding(level), className: 'tree_label' },
						_react2.default.createElement('i', { onClick: isParent ? this.doExpand : null, className: expandIcon }),
						checkbox ? _react2.default.createElement(_checkbox2.default, { id: id, onChange: this.props.doChecked, checked: checked, halfChecked: halfChecked }) : null,
						_react2.default.createElement('i', { className: 'icon ' + nodeIcon }),
						_react2.default.createElement(
							'span',
							{ className: 'node_name' },
							name
						)
					),
					this.getNodeControll()
				);
			}
		}]);
	
		return TreeNode;
	}(_react.Component);
	
	TreeNode.propTypes = {
		node: _react2.default.PropTypes.object.isRequired,
		doExpand: _react2.default.PropTypes.func,
		doActive: _react2.default.PropTypes.func,
		doChecked: _react2.default.PropTypes.func
	};
	exports.default = TreeNode;
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(7);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Author:             Roy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Date:               2016-01-15 14:30:50
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Description:        
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Email:              chenxuezhong@360.cn
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Last Modified by:   Roy
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * @Last Modified time: 2016-02-01 11:06:43
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */
	
	var Checkbox = function (_Component) {
		_inherits(Checkbox, _Component);
	
		function Checkbox(props) {
			_classCallCheck(this, Checkbox);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));
	
			_this.state = {
				checked: props.checked,
				halfChecked: props.halfChecked
			};
	
			_this.changeState = _this.changeState.bind(_this);
			_this.halfCheck = _this.halfCheck.bind(_this);
			return _this;
		}
	
		_createClass(Checkbox, [{
			key: "halfCheck",
			value: function halfCheck(halfchk) {
				this.refs.checkbox.indeterminate = halfchk;
				this.setState({
					checked: false,
					halfChecked: halfchk
				});
			}
		}, {
			key: "componentWillReceiveProps",
			value: function componentWillReceiveProps(nextProps) {
	
				if (this.props.checked !== nextProps.checked || this.props.halfChecked !== nextProps.halfChecked) {
	
					this.setState({
						checked: nextProps.checked,
						halfChecked: nextProps.halfChecked
					});
				}
			}
		}, {
			key: "changeState",
			value: function changeState(e) {
				e.stopPropagation();
				this.setState({
					checked: e.target.checked,
					halfChecked: false
				});
				this.props.onChange(e.target.checked, this.props.id);
			}
		}, {
			key: "onClick",
			value: function onClick(e) {
				e.stopPropagation();
				return false;
			}
		}, {
			key: "render",
			value: function render() {
				var state = this.state.checked ? "icon-check_box" : this.state.halfChecked ? "icon-indeterminate_check_box" : "icon-check_box_outline_blank";
				var className = "checkbox icon " + state;
				return _react2.default.createElement(
					"span",
					{ onClick: this.onClick, className: className },
					_react2.default.createElement("input", { onChange: this.changeState, ref: "checkbox", checked: this.state.checked, type: "checkbox", className: "hidden", name: this.props.name })
				);
			}
		}]);
	
		return Checkbox;
	}(_react.Component);
	
	Checkbox.defaultProps = {
		checked: false,
		halfChecked: false
	};
	Checkbox.propTypes = {
		checked: _react2.default.PropTypes.bool.isRequired,
		halfChecked: _react2.default.PropTypes.bool.isRequired,
		onChange: _react2.default.PropTypes.func.isRequired,
		id: _react2.default.PropTypes.number.isRequired,
		name: _react2.default.PropTypes.string
	};
	exports.default = Checkbox;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=tree.js.map