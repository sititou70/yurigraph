import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

// 汎用のグラフデータ構造．フィルタリングや1対1解決など，抽象的なグラフ操作で使用する
export type NodeId = number;

export type LinkId = number;
export type Link = {
  id: LinkId;
  nodes: [NodeId, NodeId];
  num: number;
};

export type Graph = {
  nodes: NodeId[];
  links: Link[];
};

// D3のグラフデータ構造．配置や描画に使用する
export interface D3Node extends SimulationNodeDatum {
  node_id: NodeId;
}

export interface D3Link extends SimulationLinkDatum<D3Node> {
  link_id: LinkId;
  node_ids: [NodeId, NodeId];
}

export type D3Graph = {
  nodes: D3Node[];
  links: D3Link[];
};
