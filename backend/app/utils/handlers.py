# utils/handlers.py

from rest_framework.response import Response
from rest_framework.views import exception_handler
from rest_framework import status
from .exceptions import WrapperException
from app.constants.error import ERROR_OBJECTS, UNHANDLED_ERROR
import logging

logger = logging.getLogger(__name__)


def custom_exception_handler(exc, context):
    """
    Custom exception handler that formats responses for WrapperException
    and handles other exceptions globally.
    """
    if isinstance(exc, WrapperException):
        # Get error details from ERROR_OBJECTS based on the error key passed
        error_info = ERROR_OBJECTS.get(exc.error_key, ERROR_OBJECTS[UNHANDLED_ERROR])
        status_code = error_info.get("status_code", status.HTTP_500_INTERNAL_SERVER_ERROR)
        message = error_info.get("message", "An error occurred")

        # Return a structured response with status code and message
        return Response({
            "error": message
            }, status=status_code)
    
    # For all other unhandled exceptions, use DRF's default exception handler
    response = exception_handler(exc, context)
    
    # If the exception handler does not return a response, return a generic error message
    if not response:
        logger.error(exc)
        return Response({
            "error": "Something went wrong. Please try again later.",
            "details": str(exc)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return response
