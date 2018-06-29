import pytest
import json
from flask import g, session
from flaskr.db import get_db

@pytest.mark.parametrize(('service', 'message'),(
    ('service title 1', json.dumps({
        "explanation": ["service explanation 1"],
        "image": ["image url 1-1", "image url 1-2"], 
        "video": ["video url 1-1", "video url 1-2"]}),
    ('a', b'This request seemed to fail.'),
    ('', b'A service is required.'),
))
def test_services(client, service):
    response = client.get('/retrieve', data={'service': service})
    assert message in response.data
    