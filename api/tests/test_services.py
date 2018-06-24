import pytest
from flask import g, session
from flaskr.db import get_db

@pytest.mark.parametrize(('service'),(
    ('service title 1'),
    ('a'),
    (''),
))
def test_services(client, service):
    