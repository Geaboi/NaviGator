import networkx as nx
import osmnx as ox

ox.__version__

G = ox.graph_from_place("Piedmont, California, USA", network_type="drive")
fig, ax = ox.plot_graph(G)

gdf_nodes, gdf_edges = ox.graph_to_gdfs(G)
gdf_nodes.head()
gdf_edges.head()
print(gdf_edges)