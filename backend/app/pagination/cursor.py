from rest_framework.pagination import CursorPagination

class CustomCursorPagination(CursorPagination):
    page_size = 10  # Number of items per page
    ordering = '-created_at'  # Use your `created_at` field for ordering
    