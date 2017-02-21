from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/pool/<string:pool_id>', methods=['GET'])
def get_pool(pool_id):
    return "Pool ID: %s" % (pool_id)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
