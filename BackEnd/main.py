from flask import request, jsonify, Flask
import osmnx as ox
import heapq
from flask_cors import CORS

G = ox.graph_from_place("Orlando, Florida, USA", network_type="drive")

app = Flask(__name__)
CORS(app)

def dijkstra(G, start, goal):
    queue = [(0, start)]
    distances = {node: float('inf') for node in G.nodes}
    distances[start] = 0
    path = {}

    while queue:
        current_distance, current_node = heapq.heappop(queue)
        if current_node == goal:
            break
        for neighbor in G.neighbors(current_node):
            weight = G[current_node][neighbor][0]['length']
            distance = current_distance + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(queue, (distance, neighbor))
                path[neighbor] = current_node

    if goal not in path:
        return None

    shortest_path = []
    current_node = goal
    while current_node != start:
        shortest_path.append(current_node)
        current_node = path.get(current_node)
    shortest_path.append(start)
    shortest_path.reverse()

    return shortest_path

def a_star(G, start, goal):
    queue = [(0, start)]
    costs = {node: float('inf') for node in G.nodes}
    costs[start] = 0
    path = {}
    def heuristic(node, goal):
        return ox.distance.euclidean_dist_vec(G.nodes[node]['y'], G.nodes[node]['x'], G.nodes[goal]['y'], G.nodes[goal]['x'])

    while queue:
        current_cost, current_node = heapq.heappop(queue)
        if current_node == goal:
            break
        for neighbor in G.neighbors(current_node):
            weight = G[current_node][neighbor][0]['length']
            cost = current_cost + weight
            if cost < costs[neighbor]:
                costs[neighbor] = cost
                priority = cost + heuristic(neighbor, goal)
                heapq.heappush(queue, (priority, neighbor))
                path[neighbor] = current_node

    if goal not in path:
        return None

    shortest_path = []
    current_node = goal
    while current_node != start:
        shortest_path.append(current_node)
        current_node = path.get(current_node)
    shortest_path.append(start)
    shortest_path.reverse()

    return shortest_path

@app.route('/get_shortest_path', methods=['POST'])
def getPath():
    data = request.get_json()
    print('Received data:', data)  # Log the received data

    start = data.get('start', [])
    end = data.get('end', [])
    algorithm = data.get('algorithm', 'dijkstra')

    if not start or not end:
        return jsonify({"error": "Invalid start or end coordinates"}), 400

    orig_node = ox.distance.nearest_nodes(G, X=start[1], Y=start[0])
    dest_node = ox.distance.nearest_nodes(G, X=end[1], Y=end[0])

    if algorithm == 'dijkstra':
        shortest_path = dijkstra(G, orig_node, dest_node)
    elif algorithm == 'a_star':  # Updated to match the received data
        shortest_path = a_star(G, orig_node, dest_node)
    else:
        return jsonify({"error": "Invalid algorithm selected"}), 400

    if shortest_path is None:
        return jsonify({"error": "No path found"}), 404

    path_coords = [(G.nodes[node]['y'], G.nodes[node]['x']) for node in shortest_path]

    return jsonify(path_coords)

if __name__ == "__main__":
    app.run(debug=True)
