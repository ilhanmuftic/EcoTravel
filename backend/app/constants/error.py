from rest_framework import status


LOCATION_ALREADY_EXISTS = "locationAlreadyExists"
UNHANDLED_ERROR = "unhandledError"

ERROR_OBJECTS = {
    LOCATION_ALREADY_EXISTS: {
        "status_code": status.HTTP_400_BAD_REQUEST,
        "message": "Location with these coordinates already exists."
    },
    UNHANDLED_ERROR: {
        "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
        "message": "Something went wrong. Please try again later."
    }
}
