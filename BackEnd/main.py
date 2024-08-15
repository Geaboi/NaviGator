from flask import request, jsonify, json, Response,Flask

import osmnx as ox

import heapq

from flask_cors import CORS

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

                # Yield the current path as a list of coordinates
                current_path = []
                step_node = neighbor
                while step_node != start:
                    current_path.append((G.nodes[step_node]['y'], G.nodes[step_node]['x']))
                    step_node = path.get(step_node)
                current_path.append((G.nodes[start]['y'], G.nodes[start]['x']))
                current_path.reverse()

                yield current_path

    # Final path reconstruction
    final_path = []
    current_node = goal
    while current_node != start:
        final_path.append(current_node)
        current_node = path.get(current_node)
    final_path.append(start)
    final_path.reverse()

    yield [(G.nodes[node]['y'], G.nodes[node]['x']) for node in final_path]

def a_star(G, start, goal):
    return

@app.route('/get_shortest_path', methods=['POST'])
def getPath():
    data = request.get_json()
    start = data.get('start', [])
    end = data.get('end', [])
    algorithm = data.get('algorithm', 'dijkstra')

    # Validate input
    if len(start) != 2 or len(end) != 2:
        return jsonify({"error": "Invalid input format. Coordinates should be in the form [lat, lng]."}), 400
    
    try:
        start_coords = [float(coord) for coord in start]
        end_coords = [float(coord) for coord in end]
    except ValueError:
        return jsonify({"error": "Invalid coordinates. Coordinates must be numbers."}), 400

    try:
        # Get nearest nodes
        orig_node = ox.distance.nearest_nodes(G, X=start_coords[1], Y=start_coords[0])
        dest_node = ox.distance.nearest_nodes(G, X=end_coords[1], Y=end_coords[0])

        # Choose the algorithm
        if algorithm == 'dijkstra':
            path_generator = dijkstra(G, orig_node, dest_node)
        elif algorithm == 'a_star':
            path_generator = a_star(G, orig_node, dest_node)
        else:
            return jsonify({"error": "Unknown algorithm specified."}), 400

        def generate():
            for path in path_generator:
                yield json.dumps(path) + "\n"

        return Response(generate(), content_type='application/json')

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":

    app.run(debug= True)
