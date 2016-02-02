/* 
* @Author:             Roy
* @Date:               2015-12-31 14:33:01
* @Description:        
* @Email:              chenxuezhong@360.cn
* @Last Modified by:   Roy
* @Last Modified time: 2016-02-01 11:43:31
*/

'use strict';

require('./src/sass/tree.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './components/tree.js';
import data from './data.json';

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
    initChecked:     [2154,2153],
    groupIcon:       'icon-sitemap',
    childIcon:       'icon-desktop_mac',
    onActive(node){
        console.log(node.id)
    },
    beforeDelete(node){
        console.log(node.id)
    },
    onEdit(node){
        console.log(node.id)
    }
};

ReactDOM.render(
    <Tree title = "终端树" config = {treeConfig}  rawTreeData = {data.data.list} />,
    document.querySelector('#tree')
)





