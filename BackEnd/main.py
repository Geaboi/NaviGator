from flask import request, jsonify, json, Response, Flask

import osmnx as ox

import heapq

from flask_cors import CORS

import sklearn

G = ox.graph_from_place("Orlando, Florida, USA", network_type="drive")

app = Flask(__name__)
CORS(app)


def dijkstra(G, start, goal):
    # Priority queue to store (distance, node)
    queue = [(0, start)]
    # Dictionary to store the minimum distance to each node
    distances = {node: float('inf') for node in G.nodes}
    distances[start] = 0
    # Dictionary to store the path
    path = {}

    while queue:
        # Get the node with the smallest distance
        current_distance, current_node = heapq.heappop(queue)

        # If we reached the goal, we can stop
        if current_node == goal:
            break

        # Explore neighbors
        for neighbor in G.neighbors(current_node):
            # Calculate the distance to the neighbor
            weight = G[current_node][neighbor][0]['length']
            distance = current_distance + weight

            # If this distance is smaller, update the shortest path to this neighbor
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(queue, (distance, neighbor))
                path[neighbor] = current_node

    # Reconstruct the shortest path from start to goal
    shortest_path = []
    current_node = goal
    while current_node != start:
        shortest_path.append(current_node)
        current_node = path.get(current_node)
    shortest_path.append(start)
    shortest_path.reverse()

    return shortest_path
def a_star(G, start, goal):
    return


@app.route('/get_shortest_path', methods=['POST'])
def getPath():
    

    # Parse Request and get info for algorithims
    data = request.get_json()
    start = data.get('start', [])
    end = data.get('end', [])
    algorithm = data.get('algorithm', 'dijkstra')

    print(start)
    print(end)

    # Find the nearest nodes to the start and end points
    orig_node = ox.distance.nearest_nodes(G, X=start[1], Y=start[0])
    dest_node = ox.distance.nearest_nodes(G, X=end[1], Y=end[0])

    # Calculate the shortest path based on the selected algorithm
    if algorithm == 'dijkstra':
        shortest_path = dijkstra(G, orig_node, dest_node)
    elif algorithm == 'astar':
        shortest_path = a_star(G, orig_node, dest_node)

    # Get the coordinates of the shortest path
    path_coords = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in shortest_path]

    return jsonify(path_coords)





if __name__ == "__main__":
    app.run(debug= True)
