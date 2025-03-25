from ..lib.email import Email

class EmailConfirmationMail(Email):
    def __init__(self, emailTo:str, link:str):
        html = f'<p>Clicca sul seguente link per attivare il tuo account <a href="{link}">Clicca qui</a><br>Il link sarà valido per una sola ora</p>'
        super().__init__(subject="Conferma Email", html=html, emailTo=emailTo)