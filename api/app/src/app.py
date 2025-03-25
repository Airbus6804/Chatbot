from package.Server.server import Server

app = Server().app

#To avoid Flask crash
if(__name__ == "__main__"):
    app.run(debug=True)
