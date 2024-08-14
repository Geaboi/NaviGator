from flask import request, jsonify
from config import app

import osmnx as ox

def dijsktra():
    print("hi")

@app.route("/get_shortest_path", methods=["POST"])
def getPath():
    data = request.get_json()
    G = ox.graph_from_place("Orlando,Florida,USA", network_type = 'drive')


    start = data['start']
    end = data['end']
    algo = data['algo']

    orgin = ox.distance.nearest_nodes(G,start[1], start[0])
    dest = ox.distance.nearest_nodes(G,end[1],end[0])

    def generator():
        if algo == "Dijsktra":
            pathgen = dijsktra(G, orgin, dest)
        elif algo == "Dijkstra":
            pathgen = aastar(G,orgin,dest)





if __name__ == "__main__":

    app.run(debug= True)
