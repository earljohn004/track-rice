import unittest
from firebase_functions import firestore_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore


class TestTrigger(unittest.TestCase):

    def test_trigger(self):
        app = initialize_app()
        firestore_client: google.cloud.firestore.Client = firestore.client()

        # Push the new message into Cloud Firestore using the Firebase Admin SDK.
        _, doc_ref = firestore_client.collection("sales").add(
            {"createdAt": "1234", "totalcost": "567"}
        )

        pass
