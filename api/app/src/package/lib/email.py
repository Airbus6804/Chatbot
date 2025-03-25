import resend
from os import getenv

import resend.emails

resend.api_key = getenv('RESEND_API_KEY')

params: resend.ApiKeys.CreateParams = {
  "name": "Production",
}

resend.ApiKeys.create(params)


class Email():
    emailFrom = "chatbot@resend.dev"
    emailTo: str
    subject:str
    html: str

    def __init__(self, subject:str, html:str, emailTo:str):
        self.emailTo = emailTo
        self.subject = subject
        self.html = html

    def getHeader(self):
        return '<html><body>'

    def getFooter(self):
        return '</body></html>'
    
    def getHTML(self, html:str):
        return f"""
{self.getHeader()}
{html}
{self.getFooter()}
"""

    def send(self):
        params: resend.Emails.SendParams = {
            "from": self.emailFrom,
            "to": [self.emailTo], 
            "subject": self.subject,
            "html": self.getHTML(self.html)
        }

        return resend.Emails.send(params)