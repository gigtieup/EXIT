from flask import Blueprint, render_template

app_projects = Blueprint('projects', __name__,
                url_prefix='/projects',
                template_folder='templates/bp_projects/')

# connects /kangaroos path to render kangaroos.html
@app_projects.route('/load/')
def load():
    return render_template("load.html")

# connects /kangaroos path to render kangaroos.html
@app_projects.route('/MC/')
def MC():
    return render_template("MC.html")

@app_projects.route('/login/')
def login():
    return render_template("login.html")

@app_projects.route('/AP/')
def AP():
    return render_template("AP.html")

@app_projects.route('/NBA/')
def NBA():
    return render_template("NBA.html")

@app_projects.route('/index/')
def index():
    return render_template("index.html")