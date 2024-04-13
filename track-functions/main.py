# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

app = initialize_app()


@firestore_fn.on_document_created(document="sales/{pushId}")
def addtotalsales(
    event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None],
) -> None:
    """Listen for new documents created on sales/ collection.
    Extract the timestamp and add to the corresponding timestamp for the day
    """
    if event.data is None:
        return

    try:
        # Get the timestamp
        timestamp = event.data.get("createdAt")

        # Get the totalcost
        totalcost = event.data.get("totalPrice")
    except KeyError:
        return

    firestore_client: google.cloud.firestore.Client = firestore.client()

    # Push the new message into Cloud Firestore using the Firebase Admin SDK.
    _, doc_ref = firestore_client.collection("tracking").add(
        {"timestamp": timestamp, "totalcost": totalcost}
    )
