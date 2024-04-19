# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

FIELD_CREATED = "createdAt"
FIELD_TOTAL_PRICE = "totalPrice"
FIELD_TOTAL_SALES = "totalSales"
COLLECTION_TRACKING = "tracking"

app = initialize_app()


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
        totalcost = event.data.get(FIELD_TOTAL_PRICE)
        document_id = event.data.get(FIELD_CREATED)
    except KeyError:
        return

    firestore_client: google.cloud.firestore.Client = firestore.client()

    document_reference = firestore_client.collection(COLLECTION_TRACKING).document(
        document_id
    )

    current_value = document_reference.get().get(FIELD_TOTAL_SALES)
    total_sales = int(totalcost)

    if current_value is not None:
        total_sales = int(current_value) + int(totalcost)

    document_reference.set({FIELD_TOTAL_SALES: total_sales})
