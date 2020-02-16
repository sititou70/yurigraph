import { Selection, Simulation, SimulationNodeDatum } from 'd3';

export type ForceSimulation = Simulation<SimulationNodeDatum, undefined>;
export type ElementSelection = Selection<Element, unknown, null, undefined>;
export type NodeData = { id: number; name: string };
export type LinkData = {
  id: number;
  name: string;
  source: number;
  target: number;
  num: number;
};
