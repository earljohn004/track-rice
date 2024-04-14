# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
import datetime
from firebase_functions import firestore_fn
from google.cloud.firestore_v1.document import DocumentReference

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

app = initialize_app()

FIELD_TIMESTAMP = "createdAt"
FIELD_TOTAL_PRICE = "totalPrice"
FIELD_TOTAL_SALES = "totalSales"
COLLECTION_TRACKING = "tracking"


def extract_document_id_from_timestamp(timestamp):
    dt = datetime.datetime.fromtimestamp(timestamp)
    return dt.strftime("%Y-%m-%d")


@firestore_fn.on_document_created(document="sales/{pushId}")
def addtotalsales(
    event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None],
) -> None:
    """Listen for new documents created on sales/ collection.
    Extract the timestamp and add to tracking summary.
    Tracking contains sales total for the whole day
    """
    if event.data is None:
        return

    try:
        # Get the timestamp and totalcost
        timestamp = event.data.get(FIELD_TIMESTAMP)
        totalcost = event.data.get(FIELD_TOTAL_PRICE)
    except KeyError:
        return

    firestore_client: google.cloud.firestore.Client = firestore.client()

    document_id = extract_document_id_from_timestamp(timestamp)
    document_reference = firestore_client.collection(COLLECTION_TRACKING).document(
        document_id
    )

    current_value = document_reference.get().get(FIELD_TOTAL_SALES)
    total_sales = int(totalcost)

    if current_value is not None:
        total_sales = int(current_value) + int(totalcost)

    document_reference.set({"timestamp": timestamp, FIELD_TOTAL_SALES: total_sales})
