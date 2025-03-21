from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    return Response({"message":'you can access the page'}, status= status.HTTP_401_UNAUTHORIZED)