package com.fh.utilmy;

import net.sf.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

public class TreeBuilder {
	List<Node> nodes = new ArrayList<Node>();

	public String buildTree(List<Node> nodes) {

		TreeBuilder treeBuilder = new TreeBuilder(nodes);

		return treeBuilder.buildJSONTree();
	}
	public List<Node> buildTreeList(List<Node> nodes) {

		TreeBuilder treeBuilder = new TreeBuilder(nodes);

		return treeBuilder.buildTree();
	}
	public TreeBuilder() {
	}

	public TreeBuilder(List<Node> nodes) {
		super();
		this.nodes = nodes;
	}

	// 构建JSON树形结构
	public String buildJSONTree() {
		List<Node> nodeTree = buildTree();
		JSONArray jsonArray = JSONArray.fromObject(nodeTree);
		return jsonArray.toString();
	}

	// 构建树形结构
	public List<Node> buildTree() {
		List<Node> treeNodes = new ArrayList<Node>();
		List<Node> rootNodes = getRootNodes();
		for (Node rootNode : rootNodes) {
			buildChildNodes(rootNode);
			treeNodes.add(rootNode);
		}
		return treeNodes;
	}

	// 递归子节点
	public void buildChildNodes(Node node) {
		List<Node> children = getChildNodes(node);
		if (!children.isEmpty()) {
			for (Node child : children) {
				buildChildNodes(child);
			}
			node.setChildren(children);
		}
	}

	// 获取父节点下所有的子节点
	public List<Node> getChildNodes(Node pnode) {
		List<Node> childNodes = new ArrayList<Node>();
		for (Node n : nodes) {
			if (pnode.getId().equals(n.getPid())) {
				childNodes.add(n);
			}
		}
		return childNodes;
	}

	// 判断是否为根节点
	public boolean rootNode(Node node) {
		boolean isRootNode = true;
		for (Node n : nodes) {
			if (node.getPid().equals(n.getId())) {
				isRootNode = false;
				break;
			}
		}
		return isRootNode;
	}

	// 获取集合中所有的根节点
	public List<Node> getRootNodes() {
		List<Node> rootNodes = new ArrayList<Node>();
		for (Node n : nodes) {
			if (rootNode(n)) {
				rootNodes.add(n);
			}
		}
		return rootNodes;
	}

	public static class Node{

		private String id;
		private String pid;
		private String name;
		private String url;
		private String menu_icon;
		private List<Node> children;

		public Node() {
		}

		public Node(String id, String pid, String name,String url) {
			super();
			this.id = id;
			this.pid = pid;
			this.name = name;
			this.url = url;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public String getPid() {
			return pid;
		}

		public void setPid(String pid) {
			this.pid = pid;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}

		public String getMenu_icon() {
			return menu_icon;
		}

		public void setMenu_icon(String menu_icon) {
			this.menu_icon = menu_icon;
		}

		public List<Node> getChildren() {
			return children;
		}

		public void setChildren(List<Node> children) {
			this.children = children;
		}
	}
}
