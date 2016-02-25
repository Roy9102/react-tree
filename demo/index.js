/* 
* @Author:             Roy
* @Date:               2015-12-31 14:33:01
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-24 11:43:50
*/

'use strict';

import '../src/sass/tree.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Tree from '../build/tree.js';
import data from '../data.json';

/**
 * [treeConfig react-tree配置文件]
 * @type {Object}
 */
const treeConfig = {
    expandLevel:     1,
    initialActiveID: 2153,
    editable:        true,
    deletable:       true,
    multiSelect:     true,
    initChecked:     [100024,2153],
    groupIcon:       'icon-sitemap',
    childIcon:       'icon-desktop_mac',
    onActive(node){
        console.log(node.id)
    },
    onDelete(node){
        console.log(node.id)
    },
    onEdit(node){
        console.log(node.id)
    },
    afterInster(node){
        console.log(node.id)
    }
};

ReactDOM.render(
    <Tree title = "终端树" config = {treeConfig}  rawTreeData = {data.data.list} />,
    document.querySelector('#tree')
)





