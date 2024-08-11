import networkx as nx
import osmnx as ox

ox.__version__

G = ox.graph_from_place("Piedmont, California, USA", network_type="drive")
fig, ax = ox.plot_graph(G)