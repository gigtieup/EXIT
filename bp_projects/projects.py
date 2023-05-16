from flask import Blueprint, render_template

app_projects = Blueprint('projects', __name__,
                url_prefix='/projects',
                template_folder='templates/bp_projects/')

# connects /kangaroos path to render kangaroos.html

# connects /kangaroos path to render kangaroos.html

@app_projects.route('/AP/')
def AP():
    return render_template("AP.html")

@app_projects.route('/NBA/')
def NBA():
    return render_template("NBA.html")

@app_projects.route('/index/')
def index():
    return render_template("index.html")

@app_projects.route('/game/')
def game():
    return render_template("game.html")

@app_projects.route('/three/')
def three():
    return render_template("three.html")

@app_projects.route('/games/')
def games():
    return render_template("games.html")

@app_projects.route('/nhl/')
def nhl():
    return render_template("nhl.html")

@app_projects.route('/about/')
def about():
    return render_template("about.html")

@app_projects.route('/nab/')
def nab():
    return render_template("nab.html")

@app_projects.route('/nap/')
def nap():
    return render_template("nap.html")

@app_projects.route('/help/')
def help():
    return render_template("help.html")